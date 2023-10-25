import styled from "@emotion/styled";
import { Card, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { AddCircle } from '@mui/icons-material'



const CardElement = styled(Card)(() => ({

    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '12em',
    position:'relative',

    '&:hover .MuiCardMedia-root': {
        filter: 'brightness(0.5)'
    },

    '&:hover .MuiCardHeader-root': {
        display: 'flex'
    }

}))

const CardTitle = styled(CardHeader)(({theme}) => ({

    height: '50%',
    display: 'none',
    zIndex: '1',
    color: '#FFFFFF',
    alignItems: 'flex-start',

    '& .MuiCardHeader-content': {
        paddingTop: '0.5em'
    },

    '& .MuiCardHeader-action': {
        marginTop: '0'
    },

    '& .MuiIconButton-root':{
        color: theme.palette.primary.main,
        
    },

    '& .MuiIconButton-root:hover': {
        color: '#FFFFFF'
    },

    '& svg': {
        fontSize: '2rem'
    }
}))

const CardImage = styled(CardMedia)(() =>({

    height: '100%',
    position: 'absolute'
}))

export default function CardPhoto({sx, title,image, addPhoto}){

    return (
        <CardElement sx={sx}>

            <CardTitle title={
                <Typography variant="h4Second">{title}</Typography>
            } 
            action={
                <IconButton onClick={addPhoto}><AddCircle /></IconButton>
            }/>
            <CardImage
                component='img'
                image={image}
            />

        </CardElement>
    )
}