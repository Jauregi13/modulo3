import { AppBar, Toolbar, Typography, styled, InputBase, alpha, Container, Box, Button, IconButton,Menu,MenuItem } from "@mui/material"
import { SearchOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useSearchContext } from "./SearchContext"
import MenuIcon from '@mui/icons-material/Menu';

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
      borderRadius: '0',
      paddingTop: '0.8em'
    },
    '& h2:hover': {
      color:'#c0bfbf'
    }

  }))

export const Header = () => {

    const location = useLocation()
    const [title, setTitle] = useState('Search Photos')
    const {query,updateQuery} = useSearchContext()
    const [anchor,setAnchor] = useState(null)

    const handleOpenMenu = (event) => {
      setAnchor(event.currentTarget)
    }

    const handleCloseMenu = () => {
      setAnchor(null)
    }

    useEffect(() => {

        if(location.pathname === '/myPhotos'){
            setTitle('My Photos')
        }
        else {
            setTitle('Search Photos')
        }

    },[location.pathname])


    return (
        <AppBar position="static" className="header">
            <Container maxWidth='xl'>
              <Toolbar className="header__content">
                <Typography variant="h2" component={NavLink} to='searchPhotos' noWrap sx={{ display:{xs:'none',md:'flex'}, flexGrow: 1, typography: {xs: 'h2',sm:'h1'}, textDecoration:'none', color:'#FFFFFF'}}>
                    Search Photos
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchor}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchor)}
                    onClose={handleCloseMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <MenuItem onClick={handleCloseMenu} component={NavLink} to='searchPhotos'>
                      <Typography variant="h3" textAlign="center">Buscador</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseMenu} component={NavLink} to='myPhotos'>
                      <Typography variant="h3" textAlign="center">Mis fotos</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                { 
                    location.pathname === '/myPhotos' &&
                    (
                        <Search sx={{display:{xs:'flex',md:'none'}}}>
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
                    )
                
                }
                  <Box sx={{display: {xs:'none',md:'flex'}, height:'64px'}}>
                    <NavItem LinkComponent={NavLink} to="searchPhotos">
                      <Typography variant="h2">Buscador</Typography>
                    </NavItem>
                    <NavItem LinkComponent={NavLink} to="myPhotos">
                      <Typography variant="h2">Mis fotos</Typography>
                    </NavItem>
                  </Box>
              </Toolbar>

            </Container>
            
        </AppBar>
    )
}