import { Alert, Typography, styled } from "@mui/material"


const Message = styled(Alert)(() => ({

    width: '80%',
    position: 'absolute',
    top: '40%',
    left: '5%',
    borderRadius: '20px',
    borderWidth: '3px',

    '& .MuiAlert-icon': {
        alignItems: 'center'
    }

}))




export const AlertMessage = ({message,color, severity}) => {

    return <Message variant="outlined" color={color} severity={severity}>
                <Typography variant="h4Second">{message}</Typography>
           </Message>

}