import { CancelOutlined, DownloadOutlined, EditOutlined, FavoriteOutlined, HeightOutlined, CompareArrows } from "@mui/icons-material"
import { styled, Card, CardHeader, CardMedia, CardContent, Typography, IconButton, CardActions, Grid } from "@mui/material"

const CardElement = styled(Card)(({theme}) =>({

    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '15em',
    marginBottom:'2em',
    position:'relative',

    [theme.breakpoints.up('md')]:{
        height:'20em'
    },

    '&:hover .MuiCardMedia-root': {
        filter: 'brightness(0.5)'
    },

    '&:hover .MuiCardHeader-root, &:hover .MuiCardContent-root,&:hover .MuiCardActions-root': {
        display: 'flex',
    }


}))

const CardHeaderStyled = styled(CardHeader)(({theme}) => ({

    zIndex: '1',
    display:'none',

    '& .MuiCardHeader-content': {
        color:'#FFFFFF'
    },

    '& .MuiCardHeader-content h3': {
        marginBottom: '1em'
    },

    '& .MuiIconButton-root': {
        color: theme.palette.error.main
    },

    '& .MuiIconButton-root:hover': {
        color: '#FFFFFF'
    }
}))

const CardMediaStyled = styled(CardMedia)(() => ({

    height:'100%',
    position:'absolute',

}))




const GridStyled = styled(Grid)(() => ({

    position: 'absolute',
    bottom: '20%',

    '& .MuiGrid-item': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    '& .MuiTypography-h4SecondRegular': {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '0.2em'
    },

    '& .margin-right-width': {
        marginRight:'0.5em'
    },

    '& .margin-right-height': {
        marginRight:'0.2em'
    }
   
}))

const CardActionsStyled = styled(CardActions)(({theme}) => ({

    position: 'absolute',
    right: '0',
    bottom: '1em',
    justifyContent: 'flex-end',
    padding: '0',
    height: '10%',
    zIndex: '1',
    display:'none',

    '& .edit-photo:hover':{
        backgroundColor: '#FFFFFF',
        color: '#000000'
    },

    '& .download-blue': {
        color: theme.palette.primary.light
    },

    '& .download-blue:hover': {
        backgroundColor: '#FFFFFF'
    },

    '& >:not(:first-of-type)':{
        marginLeft: '0',
        marginRight: '0.3em'
    }

}))


export const CardPhotoWithInfo = ({title,img,height,width,likes,date,openEditModal, openRemoveModal, downloadImage}) => {

    return (
        <CardElement>

            <CardHeaderStyled

                title = {<Typography variant="h3Second" component='h3'>{title}</Typography>}
                subheader = {<Typography variant="h4SecondRegular" sx={{marginTop:'1em'}}>{date}</Typography>}
                action={
                    <IconButton onClick={openRemoveModal}><CancelOutlined/></IconButton>
                }
            />

            <CardMediaStyled
                component='img'
                image={img}
            />
            <CardContent sx={{padding: '8px', height:'50%', zIndex:'1', display:'none', color:'#FFFFFF'}}>
                <GridStyled container spacing={1}>
                    <Grid item xs={4}>
                        <HeightOutlined className="margin-right-height"/>
                        <Typography variant="h4SecondRegular">{height}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <CompareArrows className="margin-right-width"/>
                        <Typography variant="h4SecondRegular">{width}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FavoriteOutlined sx={{marginRight:'0.5em'}}/>
                        <Typography variant="h4SecondRegular">{likes}</Typography>
                    </Grid>
                </GridStyled>
                
            </CardContent>
            <CardActionsStyled>
                <IconButton onClick={openEditModal} sx={{color:'#FFFFFF'}} className="edit-photo">
                    <EditOutlined/>
                </IconButton>
                <IconButton className="download-blue" onClick={downloadImage}>
                        <DownloadOutlined />
                </IconButton>
                
            </CardActionsStyled>

        </CardElement>
    )
    

}