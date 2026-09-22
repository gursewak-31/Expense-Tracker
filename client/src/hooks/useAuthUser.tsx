import useUser from "./useUser";

// this hook guaranteed to return valid user not null
export default function useAuthUser(){
    let { user } = useUser();

    if(!user){
        throw new Error("User not authenticate");
    }

    return user;
}