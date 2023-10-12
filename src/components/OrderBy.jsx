import { Box,Typography,IconButton } from "@mui/material"
import { UnfoldMore } from "@mui/icons-material"



export const OrderBy = ({title}) => {
    return (
        <Box sx={{display:'inline-block'}}>
            <Typography variant="h5Second">{title}</Typography>
            <IconButton><UnfoldMore /></IconButton>
        </Box>
    )
}