import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { Favorite, Search } from "@mui/icons-material"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import './TabNavigation.css'

export const TabNavigation = () => {

    const [value, setValue] = useState("search")

    const handleChange = (event, newValue) => {

        setValue(newValue);
    }

    return (
        <BottomNavigation value={value} onChange={handleChange} className="bottom-navigation">
                <BottomNavigationAction
                    label="Search"
                    value="search"
                    icon={<Search />}
                    LinkComponent={NavLink}
                    to='/searchPhoto'
                />
        
        <BottomNavigationAction
            label="My Photos"
            value="myPhotos"
            icon={<Favorite />}
            LinkComponent={NavLink}
            to='/myPhotos'
        />
        </BottomNavigation>
    )
}