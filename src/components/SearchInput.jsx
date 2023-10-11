import { styled } from '@mui/material/styles'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'


const SearchComponent = styled(TextField)(({theme, ...props}) =>({
    
    backgroundColor: '#FFFFFF',
    borderRadius:'10px',
    boxShadow: '0 4px 14px 4px #878282',

    '& .MuiOutlinedInput-input': {
        border: 'none',
        outline: 'none'
    },
    
    '& .MuiOutlinedInput-input::placeholder': {
        color: '#878282',
        fontFamily: 'JetBrains Mono',
        fontWeight: '700'
    }

}))


export default function Search({sx, placeholder,name, ...other}){

    return <SearchComponent sx={sx}
            name={name} 
            placeholder={placeholder} 
            {...other}
            InputProps={{
                endAdornment: <InputAdornment position='end'><IconButton type='submit'><SearchIcon /></IconButton></InputAdornment>
            }}/>
}