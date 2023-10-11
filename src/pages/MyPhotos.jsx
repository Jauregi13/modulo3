import { Box, Container, IconButton, Typography } from "@mui/material"
import { Tag } from "../components/Tag"
import { UnfoldMore } from "@mui/icons-material"



export const MyPhotos = () => {

    return (
        <>
        <Box sx={{marginLeft:'2em', paddingTop:'1em', marginBottom:'1em'}}>
            <Tag label='Playa'/>
            <Tag label='Paisaje'/>
            <Tag label='Deporte'/>
        </Box>

        <Container sx={{backgroundColor:'#FFFFFF', width:'80%', borderRadius:'10px', boxShadow:'0 4px 10px 0 #878282'}}>
            <Box sx={{display:'inline-block', marginLeft:'2%'}}>
                <Typography variant="h5Second">Height</Typography>
                <IconButton><UnfoldMore /></IconButton>
            </Box>
            <Box sx={{display:'inline-block'}}>
                <Typography variant="h5Second">Width</Typography>
                <IconButton><UnfoldMore sx={{borderRadius:'1px solid blue'}}/></IconButton>
            </Box>
            <Box sx={{display:'inline-block'}}>
                <Typography variant="h5Second">Likes</Typography>
                <IconButton><UnfoldMore /></IconButton>
            </Box>
            <Box sx={{display:'inline-block'}}>
                <Typography variant="h5Second">Date</Typography>
                <IconButton><UnfoldMore /></IconButton>
            </Box>
        </Container>
        

        </>
    )
}