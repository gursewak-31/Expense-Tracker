import SideBar from "./sidebar";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
            <div className="h-screen w-full bg-slate-950 flex gap-2 overflow-y-auto">
                <SideBar></SideBar>
                <main className="flex-1">
                    <Outlet></Outlet>
                </main>
            </div>
        </>
    )
}