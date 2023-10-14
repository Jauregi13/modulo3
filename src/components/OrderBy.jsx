import { Box,Typography,IconButton } from "@mui/material"



export const OrderBy = ({title, onClick,icon}) => {
    return (
        <Box sx={{display:'inline-block'}}>
            <Typography variant="h5Second">{title}</Typography>
            <IconButton onClick={onClick}>{icon}</IconButton>
        </Box>
    )
}