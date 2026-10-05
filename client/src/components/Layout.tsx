import SideBar from "./sidebar";
import { Outlet } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { useState } from "react";

export default function Layout(){
    let [isSideBarOpen, setIsSideBarOpen] = useState(false);
    return(
        <>
            <div className="h-screen w-full bg-slate-950 flex gap-2 overflow-y-auto">
                <SideBar isOpen = {isSideBarOpen} setIsOpen = {setIsSideBarOpen} ></SideBar>
                <main className="flex-1">
                    <button className="md:hidden absolute top-10 left-5" onClick={() => setIsSideBarOpen(true)}>
                        <FaBars/>
                    </button>
                    <Outlet></Outlet>
                </main>
            </div>
        </>
    )
}