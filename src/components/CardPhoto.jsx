import styled from "@emotion/styled";
import { Card, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { AddCircle } from '@mui/icons-material'

const CardElement = styled(Card)(() => ({

    borderRadius: '20px'

}))

const CardTitle = styled(CardHeader)(({theme}) => ({

    '& .MuiIconButton-root':{
        color: theme.palette.primary.main
    }
}))

export default function CardPhoto({sx, title,image}){

    return (
        <CardElement sx={sx}>

            <CardTitle title={
                <Typography variant="h5Second">{title}</Typography>
            } 
            action={
                <IconButton><AddCircle /></IconButton>
            }/>
            <CardMedia 
                component='img'
                image={image}
                height='30%'
                />

        </CardElement>
    )
}