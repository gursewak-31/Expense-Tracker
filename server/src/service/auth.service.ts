import * as actions from "../database/auth.dbActions.js";
import { validate, deleteImage } from "../utils/authUtils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import type { NewUser, LoginData } from "../types/types.js";

let envPath = path.join(import.meta.dirname, "../../.env");
dotenv.config({
    path: envPath
});

const jwtKey = process.env.SECRET_KEY;

export async function signup(data: NewUser){
    let isValid = validate(data);
    if(!isValid){
        await deleteImage(data.profileImage);
        return {statusCode: 422}
    }

    let check = await actions.checkUser(data.email);
    if(check){
        await deleteImage(data.profileImage);
        return {statusCode: 409};
    }

    let hashedPass = await bcrypt.hash(data.password, 12);

    let userId = await actions.insertUser({...data, password: hashedPass});

    if(!jwtKey){
        await deleteImage(data.profileImage);
        throw new Error("Undefined key");
    }

    if(userId){
        let token = jwt.sign({userId: userId}, jwtKey, {expiresIn: "1d"});
        return {statusCode: 200, new_id: userId, token: token};
    }

    throw new Error("failed to signup");
}

export async function login(data: LoginData){
    let isValid = validate(data);
    if(!isValid){
        return {statusCode: 422}
    }

    let user = await actions.checkUser(data.email);

    let isPassValid = await bcrypt.compare(data.password, user?.password ?? "");

    if(!jwtKey){
        throw new Error("Undefined key");
    }
    
    if(user && isPassValid){
        let token = jwt.sign({userId: user._id}, jwtKey, {expiresIn: "1d"});
        return {statusCode: 200, user: user, token: token};
    }

    return {statusCode: 404};
}

export async function getUser(id: string){
    let user = await actions.getUser(id);

    return user;
}

export async function updateProfileImage(image: string | undefined, oldImageName: string, userId: string){
    let update = await actions.updateImage(image, userId);

    if(update){
        await deleteImage(oldImageName);
        return {statusCode: 200, msg: "Image updated successfully.", image: image}
    }

    throw new Error("Failed to update image.");
}

export async function updateData(data: {firstName: string, lastName?: string, email: string}, userId: string){
    let update = await actions.updateUser(data, userId);
    
    if(update){
        return {statusCode: 200, msg: "Data update successfully"}
    }
    
    throw new Error("Falies to update user data.")
}

export async function updatePassword(data: {currentPassword: string, newPassword: string}, userId: string){
    let check = await actions.getPassword(userId);

    let isValid = await bcrypt.compare(data.currentPassword, check?.password ?? "");
    if(!isValid){
        return {statusCode: 401, msg: "Incorrect current password. Please enter correct password."};
    }

    let password = await bcrypt.hash(data.newPassword, 12);

    let update = await actions.updatePassword(password, userId);

    if(update){
        return {statusCode: 200, msg: "Password updated sucessfully."};
    }

    throw new Error("Falies to update user password.");
}

export async function deleteUser(userId: string){
    let user = await actions.getUser(userId);

    if(user?.profileImage){
        await deleteImage(user.profileImage);
    }

    let remove = await actions.deleteUser(userId);

    if(remove){
        return {statusCode: 200, msg: "Account deactivate successfully."};
    }

    throw new Error("Failed to deactivate account.");
}