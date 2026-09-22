import type { NewUser, LoginData } from "../types/types.js";
import fs from "fs";
import { unlink } from "fs/promises";
import path from "path";

export function validate(data: NewUser | LoginData){
    let isValid = true;

    for(let [field, value] of Object.entries(data)){
        switch(field){
            case "firstName":
                if(!/^[a-zA-Z\s]+$/.test(value))
                    isValid = false;
                break;
            case "lastName":
                if(!/^[a-zA-Z\s]*$/.test(value))
                    isValid = false;
                break;
            case "email":
                if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    isValid = false;
                break;
            case "password":
                if(!/^.{8,32}$/.test(value))
                    isValid = false;
                break;
        }
    }

    return isValid;
}

export async function deleteImage(imageName: string | undefined){
    if(imageName){
        let image = path.join(import.meta.dirname, "../../../uploads", `${imageName}`);
        if(fs.existsSync(image)){
            await unlink(image);
        }
    }
}