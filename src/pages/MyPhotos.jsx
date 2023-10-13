import { Box, Container } from "@mui/material"
import { Tag } from "../components/Tag"
import { OrderBy } from "../components/OrderBy"
import { CardPhotoWithInfo } from "../components/CardPhotoWithInfo"
import { useDispatch, useSelector } from "react-redux"
import { editPhoto, getFavouritePhotos, removePhoto } from "../feature/favouriteSlice"
import { useEffect, useState } from "react"
import { format, set } from "date-fns"
import { ModalDialog } from "../components/ModalDialog"
import { useSearchContext } from "../components/SearchContext"



export const MyPhotos = () => {

    const dispatch = useDispatch()
    const getPhotos = useSelector(getFavouritePhotos)
    const [imageFavourites,setImageFavourites] = useState([])
    const [imageActual, setImageActual] = useState({})
    const [newName,setNewName] = useState('')
    const [openEdit,setOpenEdit] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)
    const {query} = useSearchContext()

    const openEditModal = (image) => {

        setImageActual(image)
        setNewName(image.name)
        setOpenEdit(true);
    }

    const closeEditModal = () => {
        
        setOpenEdit(false)
    }

    const openRemoveModal = (image) => {

        setImageActual(image)
        setOpenRemove(true)
    }

    const closeRemoveModal = () => {

        setOpenRemove(false)
    }

    const handleRemovePhoto = () => {

        dispatch(removePhoto(imageActual))
        closeRemoveModal()
    }

    const handleEditPhoto = () => {
        let images = {
            actualName : imageActual.name,
            newName: newName
        }
        dispatch(editPhoto(images))
        closeEditModal()
    }

    useEffect(() => {

        if(query === ''){
            setImageFavourites(getPhotos)
        }
        else {
            setImageFavourites(getPhotos.filter((image) => image.name.includes(query)))  
        }

    },[dispatch,getPhotos,query])

    return (
        <>
        <Box sx={{marginLeft:'2em', paddingTop:'1em', marginBottom:'1em'}}>
            <Tag label='Playa'/>
            <Tag label='Paisaje'/>
            <Tag label='Deporte'/>
        </Box>

        <Container sx={{backgroundColor:'#FFFFFF', width:'80%', borderRadius:'10px', boxShadow:'0 4px 10px 0 #878282', display:'flex'}}>
            <OrderBy title='Height'/>
            <OrderBy title='Width' />
            <OrderBy title='Likes' />
            <OrderBy title='Date' />
        </Container>

        <Container sx={{width: '80%', marginTop: '1em'}}>

            {
                imageFavourites.map((image,id) => (
                    <CardPhotoWithInfo key={id} title={image.name} img={image.image_small} height={image.height} width={image.width} 
                    likes={image.likes} openEditModal={() => openEditModal(image)} openRemoveModal={() => openRemoveModal(image)}/>
                ))
            }
        </Container>

        <ModalDialog 
            title='Edit name photo'
            text='Escribe la nueva descripción de la imagen'
            setNewName={setNewName}
            operation={() => handleEditPhoto()}
            open={openEdit}
            imageActualName={newName}
            close={() => closeEditModal()}
            role='edit'
        />

        <ModalDialog 
            title='Remove photo'
            text='Estás seguro que quieres eliminar esta foto de favoritos?'
            operation={() => handleRemovePhoto()}
            open={openRemove}
            close={() => closeRemoveModal()}
        />
        

        </>
    )
}