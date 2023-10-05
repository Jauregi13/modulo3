import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import './Header.css'

export const Header = () => {
    const location = useLocation()
    const [title, setTitle] = useState('Search Photos')

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
            <Toolbar className="header__content">
                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}