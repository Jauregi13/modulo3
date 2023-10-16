import { AppBar, Toolbar, Typography, styled, InputBase, alpha, Hidden, Box, Button } from "@mui/material"
import { SearchOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
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
      width: '50%',
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
    width: '100%',
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
     
      
    },
  }));

  const NavItem = styled(Button)(() => ({

    '& h2':{
      color: '#FFFFFF'
    },

    '&.active': {
      borderBottom: '5px solid #FFFFFF',
      borderRadius: '0'
    },
    '& h2:hover': {
      color:'#c0bfbf'
    }

  }))

export const Header = () => {

    const location = useLocation()
    const [title, setTitle] = useState('Search Photos')
    const {query,updateQuery} = useSearchContext()

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
                <Typography variant="h2" noWrap component="div" sx={{ flexGrow: 1, typography: {xs: 'h2',sm:'h1'}}}>
                    {title}
                </Typography>
                { 
                    location.pathname === '/modulo3/myPhotos' &&
                    (
                      <Hidden mdUp>
                        <Search>
                            <SearchIconWrapper>
                                <SearchOutlined />
                            </SearchIconWrapper>
                            <StyledInputBase
                            placeholder="Search Description…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={query}
                            onChange={(event) => updateQuery(event.target.value)}
                            />
                        </Search>
                      </Hidden>
                    )
                
                }
                <Hidden mdDown>
                  <Box sx={{display: 'flex', height:'64px'}}>
                    <NavItem LinkComponent={NavLink} to="searchPhotos">
                      <Typography variant="h2">Search Photos</Typography>
                    </NavItem>
                    <NavItem LinkComponent={NavLink} to="myPhotos">
                      <Typography variant="h2">My Photos</Typography>
                    </NavItem>
                  </Box>
                </Hidden>
                
            </Toolbar>
        </AppBar>
    )
}