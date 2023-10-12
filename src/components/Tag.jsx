import { Box, Chip, Typography, styled } from "@mui/material"

const ChipStyle = styled(Chip)(({theme}) =>({

    borderColor: theme.palette.primary.light,
    backgroundColor: '#FFFFFF'

}))




export const Tag = ({label}) => {

    return (
        
        <ChipStyle label={<Typography variant="h5Second">{label}</Typography>} 
        
        variant="outlined" sx={{marginRight:'1em'}} clickable></ChipStyle>
        
    )

}