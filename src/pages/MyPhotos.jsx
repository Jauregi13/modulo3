import { Backdrop, CircularProgress, Container, Stack, Pagination, Grid, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { CardPhotoWithInfo } from "../components/CardPhotoWithInfo"
import Search from '../components/SearchInput';
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
    const {query, updateQuery} = useSearchContext()

    const [imageFavourites,setImageFavourites] = useState([])
    const [imageActual, setImageActual] = useState({})
    const [newName,setNewName] = useState('')

    const [loadingDownload,setloadingDownload] = useState(false)
    const [openEdit,setOpenEdit] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)

    const [page,setPage] = useState(1)
    const [imagesPerPage,setImagesPerPage] = useState(3)
    
    const [order,setOrder] = useState({
        ordered: false,
        orderType: 'none',
        orderMode: 'none'
    })
    const [orderModeDisabled,setOrderModeDisabled] = useState(true)

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

    const handleOrderType = (event) => {

        
        if(event.target.value === "none"){
            setOrder({...order,ordered:false,orderType:'none',orderMode:'none'})
        }
        else {
            setOrder({...order,orderType: event.target.value})
        }

        setOrderModeDisabled(event.target.value === "none")

         
    }

    const handleOrderMode = (event) => {

        if(event.target.value === "none"){
            setOrder({...order,ordered: false,orderMode:'none'})
        }
        else {
            setOrder({...order,ordered: true, orderMode: event.target.value})
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

        console.log(order);

        setImageFavourites(updatedImageFavourites)

    },[dispatch,getPhotos,query,order])


    const formatedDataImages = imageFavourites.map((image) => {
        const dateImage = new Date(image.date)
        const dateFormat = format(dateImage,"dd MMM,yyyy")
        return {...image,date:dateFormat}
    })

    const handleChangePage = (event,newPage) => {

        setPage(newPage)
    }

   
    window.addEventListener('load',()=> {
        if(window.innerWidth <= 899.5){
            setImagesPerPage(2)
        }
        else {
            setImagesPerPage(3)
        }
    })

    
    window.addEventListener('resize',() => {
        console.log(window.innerWidth);
        if(window.innerWidth <= 899.5){
            setImagesPerPage(2)
        }
        else {
            setImagesPerPage(3)
        }
    })
    
    const startImage = (page -1) * imagesPerPage
    const endImage = startImage + imagesPerPage
    const displayImages = formatedDataImages.slice(startImage,endImage)


    return (
        <>

        <Box sx={{display:'flex'}}>
            <Search sx={{display:{xs:'none',md:'flex'},mr: {md:'3em'},mt:'1.5em', ml:'1.5em', mb:'2.5em', width:{xs: '80%',sm:'70%',md:'40%'}, height:'3.5em'}} onChange={(event) => updateQuery(event.target.value)} placeholder='Search Description...' name='search'/>
            
            <Box sx={{backgroundColor:'#FFFFFF', width:{xs:'80%',md:'50%',lg:'33em'}, borderRadius:'10px', boxShadow:'0 4px 10px 0 #878282', display:'flex', justifyContent:'center', mr:{md:'auto'},ml:{md:'auto'}, mb:{md:'2em'},mt:{xs:'2em', md:'1.5em'}, pt:'1em',pb:'1em'}}>

                <FormControl sx={{minWidth:'200px', mr:'2em'}}>
                    <InputLabel id="order_type">Ordenar por</InputLabel>
                    <Select label='Ordenar por' labelId="order_type" onChange={handleOrderType} value={order.orderType}>
                        <MenuItem value="none">Sin ordenar</MenuItem>
                        <MenuItem value="height">Height</MenuItem>
                        <MenuItem value="width">Width</MenuItem>
                        <MenuItem value="likes">Likes</MenuItem>
                        <MenuItem value="date">Fecha</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{minWidth:'200px'}} disabled={orderModeDisabled}>
                    <InputLabel id="order_mode">Modo de ordenación</InputLabel>
                    <Select label='Modo de ordenación' labelId="order_mode" value={order.orderMode} onChange={handleOrderMode}> 
                        <MenuItem value="none">Sin elegir</MenuItem>
                        <MenuItem value="asc">Ascendente</MenuItem>
                        <MenuItem value="desc">Descendente</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
        
        

        <Container sx={{width: {xs:'80%',md:'100%'} , marginTop: '1em'}}>

            {
                <Grid container columnSpacing={6}>
                    {
                        displayImages.map((image,id) => (
                            <Grid item xs={12} md={4} key={id}>
                                <CardPhotoWithInfo  title={image.name} img={image.image_url} height={image.height} width={image.width} 
                                    likes={image.likes} date={image.date} 
                                    openEditModal={() => openEditModal(image)} 
                                    openRemoveModal={() => openRemoveModal(image)}
                                    downloadImage={() => handleDownloadImage(image)}/>
                            </Grid>
                        ))
                    }

                </Grid>
                
                
                
                
            }

            {
                formatedDataImages.length >= 3 &&

                <Stack spacing={2} sx={{alignItems:'center'}}>
                <Pagination color='primary'
                    count={Math.ceil(formatedDataImages.length/imagesPerPage)}
                    page={page}
                    onChange={handleChangePage}
                />
                </Stack>
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