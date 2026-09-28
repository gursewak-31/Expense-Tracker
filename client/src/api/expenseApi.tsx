import axios from "axios";
import type { NewExpense } from "../types/types";

const req = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export async function getExpenses(sortBy: string, sortOrder: string, search: string, filter: string, entriesPP: string, page: number){
    try{
        let res = await req.get(`/expense?sort=${sortBy}&order=${sortOrder}&search=${search}&filter=${filter}&record=${entriesPP}&page=${page}`);

        return res.data;
    }catch(err){
        if(axios.isAxiosError(err)){
            if(err.status == 401) window.location.href = "/login";
        }
        return null;
    }
}

export async function addExpense(data: NewExpense){
    try{
        let res = await req.post("/expense", data, {headers: {"Content-Type": "application/json"}});

        return res.data;
    }catch(err){
        if(axios.isAxiosError(err)){
            if(err.status == 401)
                setTimeout(() => window.location.href = "/login", 3000);
            return err.response?.data;
        }
        return {success: false, msg: "Somthing went wrong. please try again later."};
    }
}

export async function updateExpense(data: NewExpense, id: string){
    try{
        let res = await req.post("/expense/update", {...data, id: id}, {headers: {"Content-Type": "application/json"}});

        return res.data;
    }catch(err){
        if(axios.isAxiosError(err)){
            if(err.status == 401) 
                setTimeout(() => window.location.href = "/login", 3000);
            return err.response?.data;
        }
        return {success: false, msg: "Somthing went wrong. please try again later."};
    }
}

export async function deleteExpense(id: string){
    try{
        let res = await req.delete(`/expense/${id}`);

        return res.data;
    }catch(err){
        if(axios.isAxiosError(err)){
            if(err.status == 401) 
                setTimeout(() => window.location.href = "/login", 3000);
            return err.response?.data;
        }
        return {success: false, msg: "Somthing went wrong. please try again later."};
    }
}

export async function dashboardData(){
    try{
        let res = await req.get("/expense/data");

        return res.data.data
    }catch(err){
        if(axios.isAxiosError(err)){
            if(err.status == 401) window.location.href = "/login";
        }
        return null;
    }
}