import { TabNavigation } from "../components/TabNavigation"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"
import './Root.css'
import { SearchProvider } from "../components/SearchContext"
import { Hidden } from "@mui/material"
import { Footer } from "../components/Footer"


export const Root = () => {


    return (
        <>
        <SearchProvider>
            <Header />
            <div className="main-content">
                <Outlet />
            </div>
            <Hidden mdUp>
                <TabNavigation />
            </Hidden>
            <Hidden mdDown>
                <Footer />
            </Hidden>
            
        </SearchProvider>
        
        </>
    )
}