import { CancelOutlined, DownloadOutlined, EditOutlined, FavoriteOutlined, HeightOutlined } from "@mui/icons-material"
import { styled, Card, CardHeader, CardMedia, CardContent, Typography, IconButton, CardActions, Grid } from "@mui/material"

const CardElement = styled(Card)(() =>({

    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '15em',
    marginBottom:'2em'

}))

const CardHeaderStyled = styled(CardHeader)(({theme}) => ({

    height: '10%',

    '& .MuiIconButton-root': {
        color: theme.palette.error.main
    }
}))


const GridStyled = styled(Grid)(() => ({

    '& .MuiGrid-item': {
        display: 'flex',
        justifyContent: 'center'
    },

    '& .MuiTypography-h4SecondRegular': {
        display: 'flex',
        alignItems: 'center'
    }
   
}))

const CardActionsStyled = styled(CardActions)(({theme}) => ({

    justifyContent: 'flex-end',
    padding: '0',
    height: '10%',

    '& .download-blue': {
        color: theme.palette.primary.light
    },

    '& >:not(:first-of-type)':{
        marginLeft: '0'
    }

}))


export const CardPhotoWithInfo = ({title,img,height,width,likes,date,openEditModal, openRemoveModal, downloadImage}) => {

    return (
        <CardElement>

            <CardHeaderStyled

                title = {<Typography variant="h3Second" component='h3'>{title}</Typography>}
                subheader = {<Typography variant="h4SecondRegular">{date}</Typography>}
                action={
                    <IconButton onClick={openRemoveModal}><CancelOutlined/></IconButton>
                }
            />

            <CardMedia 
                sx={{height:'50%'}}
                component='img'
                image={img}
            />
            <CardContent sx={{padding: '8px', height:'10%'}}>
                <GridStyled container spacing={1}>
                    <Grid item xs={4}>
                        <HeightOutlined/>
                        <Typography variant="h4SecondRegular">{height}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <HeightOutlined/>
                        <Typography variant="h4SecondRegular">{width}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FavoriteOutlined sx={{marginRight:'0.5em'}}/>
                        <Typography variant="h4SecondRegular">{likes}</Typography>
                    </Grid>
                </GridStyled>
                
            </CardContent>
            <CardActionsStyled>
                <IconButton onClick={openEditModal}>
                    <EditOutlined/>
                </IconButton>
                <IconButton className="download-blue" onClick={downloadImage}>
                        <DownloadOutlined />
                </IconButton>
                
            </CardActionsStyled>

        </CardElement>
    )
    

}