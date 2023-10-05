import { TabNavigation } from "../components/TabNavigation"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"
import './Root.css'


export const Root = () => {


    return (
        <>

        <Header />
        <div className="main-content">
            <Outlet />
        </div>
        
        <TabNavigation />
        </>
    )
}