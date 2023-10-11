import './SearchPhoto.css';
import Search from '../components/SearchInput';
import CardPhoto from '../components/CardPhoto';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotosThunk } from '../feature/Search/SearchThunk';
import { useEffect, useState } from 'react';
import { getImages, getSearchError, getSearchStatus } from '../feature/Search/SearchSlice';

export const SearchPhoto = () => {
    
    const dispatch = useDispatch()
    const searchImages = useSelector(getImages)
    const searchStatus = useSelector(getSearchStatus)
    const searchError = useSelector(getSearchError)
    const [images,setImages] = useState([])

    const searcPhotos = async (event) => {

        event.preventDefault()

        dispatch(getPhotosThunk(event.target.search.value))
    }

    useEffect(() => {

        switch (searchStatus) {
            case 'pending':
                
                break;

            case 'rejected':

                break;
        
            case 'fulfilled':
                console.log('hola');
                setImages(searchImages)
                break;
            default:
                break;
        }

    },[dispatch,images,searchStatus])

    return (
        <>
        
        <form onSubmit={searcPhotos}>
            <Search sx={{marginTop:'1.5em', marginLeft:'1.5em', marginBottom:'2.5em', width:'80%'}} placeholder='Search Photos...' name='search'/>
        </form>
        
        <Grid container columnSpacing={1} rowSpacing={2} sx={{width:'95%'}}>
            {images.map((image) => {
               return (
                <Grid item xs={6}>
                    <CardPhoto sx={{marginLeft:'1.5em'}}  title={image.name} image={image.url}/>
                </Grid>
               ) 
                })    
            }
        </Grid>
        
        </>
    )
}