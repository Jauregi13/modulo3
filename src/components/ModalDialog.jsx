import styled from "@emotion/styled"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"

const TextFieldStyled = styled(TextField)(() =>({

    'input[type=text]':{
        fontFamily: 'JetBrains Mono',
        fontWeight: 400,
        fontSize: '14px'
    }
}))


export const ModalDialog = ({title,text,open,close,operation,role,imageActualName, setNewName}) => {

    return (

        <Dialog open={open} onClose={close} sx={{borderColor:'error.main'}}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="h4SecondRegular">{text}</Typography>
                </DialogContentText>
                {
                    role === 'edit' && (
                        <TextFieldStyled sx={{marginTop:'2em'}}
                        type="text"
                        variant="outlined"
                        label='Image description'
                        value={imageActualName}
                        fullWidth
                        onChange={(event) => setNewName(event.target.value)}
                        />
                    )
                   
                }
                
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={operation}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}