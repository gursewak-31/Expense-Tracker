import type { NewUser, LoginData, UpdateUser } from "../types/types.js";
import fs from "fs";
import { unlink } from "fs/promises";
import path from "path";

export function validateSignup(data: NewUser): boolean{
    return (
        isValidFirstName(data.firstName) && 
        isValidLastName(data.lastName ?? "") && 
        isValidEmail(data.email) && 
        isValidPassword(data.password)
    );
}

export function validateLogin(data: LoginData): boolean{
    return (isValidEmail(data.email) && isValidPassword(data.password));
}

export function validateUpdate(data: UpdateUser): boolean{ // only validate that fields which exist in data object and need update
    let isValid = true;
    if(data.firstName)
        isValid = isValidFirstName(data.firstName);
    if(data.lastName)
        isValid = isValidLastName(data.lastName);
    if(data.email)
        isValid = isValidEmail(data.email);
    
    return isValid;
}

function isValidFirstName(firstName: string): boolean{
    return firstName.trim().length > 0 && /^[a-zA-Z\s]+$/.test(firstName);
}

function isValidLastName(lastName: string): boolean{
    return lastName.trim().length > 0 && /^[a-zA-Z\s]*$/.test(lastName);
}

function isValidEmail(email: string): boolean{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password: string): boolean{
    return password.trim().length > 0 && /^.{8,32}$/.test(password);
}

export async function deleteImage(imageName: string | undefined){
    if(imageName){
        let image = path.join(import.meta.dirname, "../../../uploads", `${imageName}`);
        if(fs.existsSync(image)){
            await unlink(image);
        }
    }
}