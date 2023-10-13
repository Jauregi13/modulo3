import { TabNavigation } from "../components/TabNavigation"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"
import './Root.css'
import { SearchProvider } from "../components/SearchContext"


export const Root = () => {


    return (
        <>
        <SearchProvider>
            <Header />
            <div className="main-content">
                <Outlet />
            </div>
            
            <TabNavigation />
        </SearchProvider>
        
        </>
    )
}