import styled from "@emotion/styled";
import { Card, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { AddCircle } from '@mui/icons-material'

const CardElement = styled(Card)(() => ({

    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '12em'

}))

const CardTitle = styled(CardHeader)(({theme}) => ({

    height: '30%',

    '& .MuiIconButton-root':{
        color: theme.palette.primary.main
    }
}))

const CardImage = styled(CardMedia)(() =>({

    height: '70%'
}))

export default function CardPhoto({sx, title,image, content, addPhoto}){

    return (
        <CardElement sx={sx}>

            <CardTitle title={
                <Typography variant="h5Second">{title}</Typography>
            } 
            action={
                <IconButton onClick={addPhoto}><AddCircle /></IconButton>
            }/>
            <CardImage
                component='img'
                image={image}
            />
            {content}

        </CardElement>
    )
}