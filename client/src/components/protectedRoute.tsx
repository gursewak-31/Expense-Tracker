import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { userData } from "../api/authApi";
import { useEffect, useState } from "react";
import PageLoader from "./pageLoader";

export default function ProtectedRoute(){
    let { user, setUser } = useUser();
    let [checking, setChecking] = useState(true);
    let redirect = useNavigate();

    async function getUser(){
        let data = await userData();

        
        if(!data){
            redirect("/login");
            return;
        }
        
        setUser(data);
        setChecking(false);
    }

    useEffect(() => {
        if(!user) getUser();
    }, []);

    if(checking){
        return <PageLoader/>
    }

    return(
        <Outlet/>
    )
}