import { Backdrop, Box, CircularProgress, Container } from "@mui/material"
import { Tag } from "../components/Tag"
import { OrderBy } from "../components/OrderBy"
import { CardPhotoWithInfo } from "../components/CardPhotoWithInfo"
import { useDispatch, useSelector } from "react-redux"
import { editPhoto, getFavouritePhotos, removePhoto } from "../feature/favouriteSlice" 
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ModalDialog } from "../components/ModalDialog"
import { useSearchContext } from "../components/SearchContext"
import { ExpandLess, ExpandMore, UnfoldMore } from "@mui/icons-material"



export const MyPhotos = () => {

    const dispatch = useDispatch()
    const getPhotos = useSelector(getFavouritePhotos)
    const {query} = useSearchContext()

    const [imageFavourites,setImageFavourites] = useState([])
    const [imageActual, setImageActual] = useState({})
    const [newName,setNewName] = useState('')

    const [loadingDownload,setloadingDownload] = useState(false)
    const [openEdit,setOpenEdit] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)
    

    const [iconHeight, setIconHeight] = useState(<UnfoldMore/>)
    const [iconWidth, setIconWidth] = useState(<UnfoldMore/>)
    const [iconLikes, setIconLikes] = useState(<UnfoldMore/>)
    const [iconDate, setIconDate] = useState(<UnfoldMore/>)
    const [order,setOrder] = useState({
        ordered: false,
        orderType: null,
        orderMode: null
    })

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

    const handleDownloadImage = async (image) => {

        setloadingDownload(true)

        setTimeout(() => {
            fetch(image.download_url).then(response => response.blob())
        .then(blob => {

            const url = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.download = image.name + '.jpg'

            link.click()

            window.URL.revokeObjectURL(url)

            setloadingDownload(false)

        }).catch((error) => {
            console.error('Error al descargar:',error);
        })
        },1000)

        

        
        
    }

    const handleOrderBy = (type) => {
        

        switch (type) {
            case 'height':

                setIconWidth(<UnfoldMore />)
                setIconLikes(<UnfoldMore />)
                setIconDate(<UnfoldMore />)

                if(iconHeight.type === UnfoldMore){
                    setIconHeight(<ExpandMore />)
                    setOrder({
                        ordered: true,
                        orderType: 'height',
                        orderMode: 'desc'
                    })
                    
                }
                else if(iconHeight.type === ExpandMore){
                    setIconHeight(<ExpandLess />)
                    setOrder({
                        ordered: true,
                        orderType: 'height',
                        orderMode: 'asc'
                    })
                }
                else {
                    setIconHeight(<UnfoldMore />)
                    setOrder({
                        ordered: false,
                        orderType: null,
                        orderMode: null
                    })

                }
                break;
            
            case 'width':

                setIconHeight(<UnfoldMore />)
                setIconLikes(<UnfoldMore />)
                setIconDate(<UnfoldMore />)

                if(iconWidth.type === UnfoldMore){
                    setIconWidth(<ExpandMore />)
                    setOrder({
                        ordered: true,
                        orderType: 'width',
                        orderMode: 'desc'
                    })
                }
                else if(iconWidth.type === ExpandMore){
                    setIconWidth(<ExpandLess />)
                    setOrder({
                        ordered: true,
                        orderType: 'width',
                        orderMode: 'asc'
                    })
                }
                else {
                    setIconWidth(<UnfoldMore />)
                    setOrder({
                        ordered: false,
                        orderType: null,
                        orderMode: null
                    })
                }
                break;
        
            case 'likes':

                setIconWidth(<UnfoldMore />)
                setIconHeight(<UnfoldMore />)
                setIconDate(<UnfoldMore />)


                if(iconLikes.type === UnfoldMore){
                    setIconLikes(<ExpandMore />)
                    setOrder({
                        ordered: true,
                        orderType: 'likes',
                        orderMode: 'desc'
                    })
                }
                else if(iconLikes.type === ExpandMore){
                    setIconLikes(<ExpandLess />)
                    setOrder({
                        ordered: true,
                        orderType: 'likes',
                        orderMode: 'asc'
                    })
                }
                else {
                    setIconLikes(<UnfoldMore />)
                    setOrder({
                        ordered: false,
                        orderType: null,
                        orderMode: null
                    })
                }
                break;
            
                case 'date':

                setIconWidth(<UnfoldMore />)
                setIconHeight(<UnfoldMore />)
                setIconLikes(<UnfoldMore />)

                if(iconDate.type === UnfoldMore){
                    setIconDate(<ExpandMore />)
                    setOrder({
                        ordered: true,
                        orderType: 'date',
                        orderMode: 'desc'
                    })
                }
                else if(iconDate.type === ExpandMore){
                    setIconDate(<ExpandLess />)
                    setOrder({
                        ordered: true,
                        orderType: 'date',
                        orderMode: 'asc'
                    })
                }
                else {
                    setIconDate(<UnfoldMore />)
                    setOrder({
                        ordered: false,
                        orderType: null,
                        orderMode: null
                    })
                }
                break;
            default:
                break;
        }
    }

    const orderDescImage = (a, b, type) => {

        if(a[type] > b[type]){
            return -1
        }
        else if (a[type] < b[type]){
            return 1
        }
        else {
            return 0
        }

    }

    const orderAscImage = (a, b, type) => {

        if(b[type] > a[type]){
            return -1
        }
        else if (b[type] < a[type]){
            return 1
        }
        else {
            return 0
        }
    }

    useEffect(() => {

        let updatedImageFavourites = [...imageFavourites]

        if(query === ''){

            updatedImageFavourites = getPhotos;
            
        }
        else if(query !== ''){

            updatedImageFavourites = getPhotos.filter((image) => image.name.includes(query));
            
        }

        if(order.ordered){
            if(order.orderMode === 'desc'){
                updatedImageFavourites = updatedImageFavourites.slice().sort((a,b) => orderDescImage(a,b,order.orderType))
            }
            else if(order.orderMode === 'asc'){
                updatedImageFavourites = updatedImageFavourites.slice().sort((a,b) => orderAscImage(a,b,order.orderType))
            }
            
        }

        setImageFavourites(updatedImageFavourites)

    },[dispatch,getPhotos,query,order])


    const formatedDataImages = imageFavourites.map((image) => {
        const dateImage = new Date(image.date)
        const dateFormat = format(dateImage,"dd MMM,yyyy")
        return {...image,date:dateFormat}
    })


    return (
        <>
        <Box sx={{marginLeft:'2em', paddingTop:'1em', marginBottom:'1em'}}>
            <Tag label='Playa'/>
            <Tag label='Paisaje'/>
            <Tag label='Deporte'/>
        </Box>

        <Container sx={{backgroundColor:'#FFFFFF', width:'80%', borderRadius:'10px', boxShadow:'0 4px 10px 0 #878282', display:'flex'}}>
            <OrderBy title='Height' onClick={() => handleOrderBy('height')} icon={iconHeight}/>
            <OrderBy title='Width' onClick={() =>handleOrderBy('width')} icon={iconWidth}/>
            <OrderBy title='Likes' onClick={() =>handleOrderBy('likes')} icon={iconLikes}/>
            <OrderBy title='Date' onClick={() => handleOrderBy('date')} icon={iconDate}/>
        </Container>

        <Container sx={{width: '80%', marginTop: '1em'}}>

            {
                formatedDataImages.map((image,id) => (
                    <CardPhotoWithInfo key={id} title={image.name} img={image.image_small} height={image.height} width={image.width} 
                        likes={image.likes} date={image.date} 
                        openEditModal={() => openEditModal(image)} 
                        openRemoveModal={() => openRemoveModal(image)}
                        downloadImage={() => handleDownloadImage(image)}/>
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

        <Backdrop open={loadingDownload} sx={{zIndex: '1'}}>

            <CircularProgress color="primary"></CircularProgress>

        </Backdrop>
        

        </>
    )
}