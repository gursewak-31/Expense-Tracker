import { useContext } from "react";
import { userContext } from "../context/userContext";

export default function useUser(){
    let context = useContext(userContext);
    
    if(!context){
        throw Error("useUser must be inside UserProvider");
    }

    return context;
}