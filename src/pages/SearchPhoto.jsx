import './SearchPhoto.css';
import Search from '../components/SearchInput';
import CardPhoto from '../components/CardPhoto';
import { Alert, Button, CircularProgress, Grid, Pagination, Stack, Typography , useTheme} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotosThunk } from '../feature/Search/SearchThunk';
import { useEffect, useState } from 'react';
import { getImages, getSearchError, getSearchStatus } from '../feature/Search/SearchSlice';
import { ModalDialog } from "../components/ModalDialog"
import { AlertMessage } from '../components/AlertMessage';
import { addPhoto } from '../feature/favouriteSlice';

export const SearchPhoto = () => {
    
    const theme = useTheme()
    const dispatch = useDispatch()
    const searchImages = useSelector(getImages)
    const searchStatus = useSelector(getSearchStatus)
    const searchError = useSelector(getSearchError)
    const [images,setImages] = useState([])
    const [alert,setAlert] = useState('')
    const [openAdd,setOpenAdd] = useState(false)
    const [loading,setLoading] = useState(false)
    const [imageActual,setImageActual] = useState({})
    const [page,setPage] = useState(1)
    const [imagesPerPage,setImagesPerPage] = useState(6)
    

    const searchPhotos = async (event) => {

        event.preventDefault()

        dispatch(getPhotosThunk(event.target.search.value))
    }

    const openAddModal = (image) => {

        setImageActual(image)
        setOpenAdd(true)
    }

    const closeAddModal = () => {
        setOpenAdd (false)
    }

    const handleAddPhoto = () => {

        dispatch(addPhoto(imageActual))
        closeAddModal()
    }

    useEffect(() => {

        let loading

        switch (searchStatus) {

            case 'idle':

                setAlert(<AlertMessage color='primary' severity='info' message='No hay ninguna foto cargada de momento' />)

                break;

            case 'pending':

                setImages([])
                setAlert('')
                setLoading(true)
                
                break;

            case 'rejected':
                
                loading = setTimeout(() => {

                })
                setLoading(false)
                setAlert(<AlertMessage color='error' severity='error' message={searchError} />)

                break;
        
            case 'fulfilled':

                loading = setTimeout(() => {

                    setLoading(false)

                    if(searchImages.length === 0){
                        setImages([])
                        setAlert(<AlertMessage color='error' severity='error' message='La busqueda no ha devuelto ninguna imagen' />)
                    }
                    else {
                        setImages(searchImages)
                    }


                },1000)
                
                break;
            default:
                break;
        }

    },[dispatch,searchImages,searchStatus])

    window.addEventListener('load',()=> {
        if(window.innerWidth <= 899.5){
            setImagesPerPage(4)
        }
        else {
            setImagesPerPage(6)
        }
    })

    
    window.addEventListener('resize',() => {
        console.log(window.innerWidth);
        if(window.innerWidth <= 899.5){
            setImagesPerPage(4)
        }
        else {
            setImagesPerPage(6)
        }
    })

    const handleChangePage = (event,newPage) => {

        setPage(newPage)
    }

    const startImage = (page -1) * imagesPerPage
    const endImage = startImage + imagesPerPage
    const displayImages = images.slice(startImage,endImage)




    return (
        <>
        
        <form onSubmit={searchPhotos}>
            <Search sx={{marginTop:'1.5em', marginLeft:'1.5em', marginBottom:'2.5em', width:{xs: '80%',sm:'70%',md:'50%'}}} placeholder='Search Photos...' name='search'/>
        </form>

        { 
            loading ? (
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                    <CircularProgress color='primary' sx={{margin: '0 auto', marginTop:'2em'}} />
                    </Grid>
                </Grid>
            ) :  images.length !== 0 ? (
                <>
                <Grid container columnSpacing={1} rowSpacing={5} sx={{width:'95%'}}>
                    {displayImages.map((image, id) => (
                        <Grid item xs={6} md={4} key={id}>
                            <CardPhoto sx={{marginLeft:'1.5em'}}  title={image.name} image={image.image_url} addPhoto={() => openAddModal(image)}/>
                        </Grid>
                    ))}
                </Grid>
                <Stack spacing={2} sx={{marginTop:'1em', alignItems:'center'}}>
                <Pagination color='primary'
                    count={Math.ceil(images.length/imagesPerPage)}
                    page={page}
                    onChange={handleChangePage}
                />
                </Stack>
                </>
             )
                
             : (
                alert
             )    
        }


        <ModalDialog 
            title='Add Photo'
            text='Quieres añadir esta imagen a favoritos?'
            operation={() => handleAddPhoto()}
            open={openAdd}
            close={() => closeAddModal()}
        />
        
        
        
        
        </>
    )
}