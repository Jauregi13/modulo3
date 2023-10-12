import { Box, Container } from "@mui/material"
import { Tag } from "../components/Tag"
import { OrderBy } from "../components/OrderBy"
import { CardPhotoWithInfo } from "../components/CardPhotoWithInfo"
import { useDispatch, useSelector } from "react-redux"
import { getFavouritePhotos, removePhoto } from "../feature/favouriteSlice"
import { useEffect, useState } from "react"
import { format, set } from "date-fns"



export const MyPhotos = () => {

    const dispatch = useDispatch()
    const getPhotos = useSelector(getFavouritePhotos)
    const [imageFavourites,setImageFavourites] = useState([])

    const handleRemovePhoto = (image) => {

        dispatch(removePhoto(image))
    }

    useEffect(() => {

        setImageFavourites(getPhotos)

    },[getPhotos])

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
                    likes={image.likes} removePhoto={() => handleRemovePhoto(image)}/>
                ))
            }
        </Container>
        

        </>
    )
}