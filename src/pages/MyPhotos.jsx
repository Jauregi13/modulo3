import { Box, CardContent, Container, Typography } from "@mui/material"
import { Tag } from "../components/Tag"
import { OrderBy } from "../components/OrderBy"
import CardPhoto from "../components/CardPhoto"
import { CardPhotoWithInfo } from "../components/CardPhotoWithInfo"



export const MyPhotos = () => {

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
            <CardPhotoWithInfo title='Paella' img='./src/assets/paella.svg' height='600px' width='1200px' likes='50' date='30 sep, 2023'/>

            <CardPhotoWithInfo title='Paella' img='./src/assets/paella.svg' height='600px' width='1200px' likes='50' date='30 sep, 2023'/>
        </Container>
        

        </>
    )
}