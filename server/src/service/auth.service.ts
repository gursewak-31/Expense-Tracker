import * as actions from "../database/auth.dbActions.js";
import { validateSignup, validateLogin, validateUpdate, deleteImage } from "../utils/authUtils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import type { NewUser, LoginData, UpdateUser } from "../types/types.js";
import AppError from "../errors/appError.js";

let envPath = path.join(import.meta.dirname, "../../.env");
dotenv.config({
    path: envPath
});

const jwtKey = process.env.SECRET_KEY;

export async function signup(data: NewUser){
    let isValid = validateSignup(data);
    if(!isValid){
        await deleteImage(data.profileImage);
        throw new AppError(422, "Please enter valid data !");
    }

    let check = await actions.checkUser(data.email);
    if(check){
        await deleteImage(data.profileImage);
        throw new AppError(409, "Email address already exist !");
    }

    let hashedPass = await bcrypt.hash(data.password, 12);

    let userId = await actions.insertUser({...data, password: hashedPass});

    if(!jwtKey){
        await deleteImage(data.profileImage);
        throw new Error("Undefined key");
    }

    if(userId){
        let token = jwt.sign({userId: userId}, jwtKey, {expiresIn: "1d"});
        return token; // return user token on successfully signup
    }

    throw new Error("Failed to signup");
}

export async function login(data: LoginData){
    let isValid = validateLogin(data);
    if(!isValid){
        throw new AppError(422, "Please enter valid data !");
    }

    let user = await actions.checkUser(data.email);

    let isPassValid = await bcrypt.compare(data.password, user?.password ?? "");

    if(!jwtKey){
        throw new Error("Undefined key");
    }
    
    if(user && isPassValid){
        let token = jwt.sign({userId: user._id}, jwtKey, {expiresIn: "1d"});
        return token; // return token when user login successully
    }

    throw new AppError(404, "Invalid email or password.");
}

export async function getUser(id: string){
    let user = await actions.getUser(id);

    return user;
}

export async function updateProfileImage(image: string | undefined, oldImageName: string, userId: string){
    let update = await actions.updateImage(image, userId);

    if(update){
        await deleteImage(oldImageName);
        return image ?? ""; // return new uploaded image or empty if user request to delete image
    }

    throw new Error("Failed to update image.");
}

export async function updateData(data: UpdateUser, userId: string){
    let isValid = validateUpdate(data);
    if(!isValid){
        throw new AppError(422, "Please enter valid data !");
    }

    if(data.email){
        let check = await actions.checkUser(data.email);
        if(check){
            throw new AppError(409, "Email address already exist !");
        }
    }

    let update = await actions.updateUser(data, userId);
    
    if(update) return;

    throw new Error("Failed to update user data");
}

export async function updatePassword(data: {currentPassword: string, newPassword: string}, userId: string){
    let check = await actions.getPassword(userId);

    let isValid = await bcrypt.compare(data.currentPassword, check?.password ?? "");
    if(!isValid){
        throw new AppError(401, "Incorrect current password. Please enter correct password.");
    }

    let isSame = await bcrypt.compare(data.newPassword, check?.password ?? "");
    if(isSame){
        throw new AppError(401, "New password must be different from your current password.");
    }

    let password = await bcrypt.hash(data.newPassword, 12);

    let update = await actions.updatePassword(password, userId);

    if(update) return;

    throw new Error("Failed to update user password.");
}

export async function deleteUser(userId: string){
    let user = await actions.getUser(userId);

    if(user?.profileImage){
        await deleteImage(user.profileImage);
    }

    let remove = await actions.deleteUser(userId);

    if(remove) return;

    throw new Error("Failed to deactivate account.");
}