import { Box,Typography,IconButton } from "@mui/material"



export const OrderBy = ({title, onClick,icon}) => {
    return (
        <Box sx={{display:'inline-block', marginRight:{md:'1em',lg:'1em'}, marginLeft:{md:'1em',lg:'2em'}}}>
            <Typography variant="h5Second">{title}</Typography>
            <IconButton onClick={onClick}>{icon}</IconButton>
        </Box>
    )
}