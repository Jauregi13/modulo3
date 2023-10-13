import { AppBar, Toolbar, Typography, styled, InputBase, alpha } from "@mui/material"
import { SearchOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import './Header.css'
import { useSearchContext } from "./SearchContext"


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '60%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
      
    },
  }));

export const Header = () => {

    const location = useLocation()
    const [title, setTitle] = useState('Search Photos')
    const {updateQuery} = useSearchContext()

    useEffect(() => {

        if(location.pathname === '/modulo3/myPhotos'){
            setTitle('My Photos')
        }
        else {
            setTitle('Search Photos')
        }

    },[location.pathname])


    return (
        <AppBar position="static" className="header">
            <Toolbar className="header__content">
                <Typography variant="h2" noWrap component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                { 
                    location.pathname === '/modulo3/myPhotos' &&
                    (
                        <Search>
                            <SearchIconWrapper>
                                <SearchOutlined />
                            </SearchIconWrapper>
                            <StyledInputBase
                            placeholder="Search Description…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event) => updateQuery(event.target.value)}
                            />
                        </Search>
                    )
                
                }
            </Toolbar>
        </AppBar>
    )
}