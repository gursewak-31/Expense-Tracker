import axios from "axios";

const req = axios.create({
    baseURL: "http://localhost:5174",
    withCredentials: true
})

export async function login(data: {email: string, password: string}){
    try{
        let reqData = {email: data.email, password: data.password};
        let res = await req.post("/auth/login", reqData, {headers: {"Content-Type": "application/json"}});

        return res.data;
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.data;
        }
        return {success: false, msg: "Somthing went wrong. please try again later."};
    }
}

export async function signup(data: FormData){
    try{
        let res = await req.post("/auth/signup", data);

        return res.data;
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.data;
        }
        return {success: false, msg: "Somthing went wrong. please try again later."};
    }
}

export async function userData(){
    try{
        let res = await req.get("/auth/user");

        return res.data.data
    }catch(err){
        return null;
    }
}

export async function updateProfileImage(data: FormData){
    try{
        let res = await req.post("/auth/updateProfileImage", data);

        return res.data;
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.data;
        }
        return {success: false, msg: "Somthing went wrong. please try again later."};
    }
}

export async function updateData(data: {firstName: string, lastname?: string, email: string}){
    try{
        let res = await req.post("/auth/updateData", data);

        return res.data;
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.data;
        }
        return {success: false, msg: "Somthing went wrong. please try again later."};
    }
}

export async function updatePassword(data: {currentPassword: string, newPassword: string, confirmPassword: string}){
    try{
        let res = await req.post("/auth/updatePassword", data);

        return res.data;
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.data;
        }
        return {success: false, msg: "Somthing went wrong. please try again later."};
    }
}

export async function logout(){
    try{
        let res = await req.get("auth/logout");

        return res.data;
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.data;
        }
        return {success: false, msg: "Somthing went wrong. please try again later."};
    }
}

export async function deactivate(){
    try{
        let res = await req.get("auth/deactivate");

        return res.data;
    }catch(err){
         if(axios.isAxiosError(err)){
            return err.response?.data;
        }
        return {success: false, msg: "Somthing went wrong. please try again later."};
    }
}