import { createContext, useState } from "react";
import type { User, UserContext } from "../types/types";

export const userContext = createContext<UserContext | null>(null);

export default function UserProvider({ children }: {children: React.ReactNode}){
    let [user, setUser] = useState<User | null>(null);

    return (
        <userContext.Provider value = {{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}