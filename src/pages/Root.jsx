import { TabNavigation } from "../components/TabNavigation"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"



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