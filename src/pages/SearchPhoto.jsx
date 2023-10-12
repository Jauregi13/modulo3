import './SearchPhoto.css';
import Search from '../components/SearchInput';
import CardPhoto from '../components/CardPhoto';
import { Alert, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotosThunk } from '../feature/Search/SearchThunk';
import { useEffect, useState } from 'react';
import { getImages, getSearchError, getSearchStatus } from '../feature/Search/SearchSlice';
import { AlertMessage } from '../components/AlertMessage';
import { addPhoto } from '../feature/favouriteSlice';

export const SearchPhoto = () => {
    
    const dispatch = useDispatch()
    const searchImages = useSelector(getImages)
    const searchStatus = useSelector(getSearchStatus)
    const searchError = useSelector(getSearchError)
    const [images,setImages] = useState([])
    const [alert,setAlert] = useState('')
    const [loading,setLoading] = useState(false)

    const searcPhotos = async (event) => {

        event.preventDefault()

        dispatch(getPhotosThunk(event.target.search.value))
    }

    const handleAddPhoto = (image) => {

        dispatch(addPhoto(image))
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

    return (
        <>
        
        <form onSubmit={searcPhotos}>
            <Search sx={{marginTop:'1.5em', marginLeft:'1.5em', marginBottom:'2.5em', width:'80%'}} placeholder='Search Photos...' name='search'/>
        </form>

        { 
            loading ? (
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                    <CircularProgress color='primary' sx={{margin: '0 auto', marginTop:'2em'}} />
                    </Grid>
                </Grid>
            ) :  images.length !== 0 ? (
                <Grid container columnSpacing={1} rowSpacing={2} sx={{width:'95%'}}>
                    {images.map((image, id) => (
                        <Grid item xs={6} key={id}>
                        <CardPhoto sx={{marginLeft:'1.5em'}}  title={image.name} image={image.image_small} addPhoto={() => handleAddPhoto(image)}/>
                        </Grid>
                    ))}
                </Grid>
             ): (
                alert
             )    
        }
        
        {}
        
        
        </>
    )
}