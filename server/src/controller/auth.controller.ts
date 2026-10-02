import type { Request, Response, NextFunction } from "express";
import * as authService from "../service/auth.service.js";

export async function signup(req: Request, res: Response, next: NextFunction){
    try{
        let userToken = await authService.signup(req.body);

        res.cookie("token", userToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax'
        });
        res.status(200).json({success: true, msg: "Sign up successfully."});
    }catch(err){
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction){
    try{
        let loginToken = await authService.login(req.body);

        res.cookie("token", loginToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax'
        });
        res.status(200).json({success: true, msg: "Login successfully."});
    }catch(err){
        next(err);
    }
}

export async function user(req: Request, res: Response, next: NextFunction){
    try{
        let result = await authService.getUser(req.userId as string);

        res.status(200).json({success: true, data: result});
    }catch(err){
        next(err);
    }
}

export async function updateProfileImage(req: Request, res: Response, next: NextFunction){
    try{
        let updatedImage = await authService.updateProfileImage(req.body.profileImage, req.body.oldImageName, req.userId as string);

        res.status(200).json({success: true, msg: "Image updated successfully.", image: updatedImage});
    }catch(err){
        next(err);
    }
}

export async function updateData(req: Request, res: Response, next: NextFunction){
    try{
        await authService.updateData(req.body, req.userId as string);

        res.status(200).json({success: true, msg: "Data update successfully."});
    }catch(err){
        console.log(err);
        next(err);
    }
}

export async function updatePassword(req: Request, res: Response, next: NextFunction){
    try{
        await authService.updatePassword(req.body, req.userId as string);

        res.status(200).json({success: true, msg: "Password updated successfully."});
    }catch(err){
        next(err);
    }
}

export async function logout(req: Request, res: Response, next: NextFunction){
    try{
        res.cookie("token", "", {expires: new Date(0)});

        res.status(200).json({success: true, msg: "logout sucessfully"});
    }catch(err){
        next(err);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction){
    try{
        let result = await authService.deleteUser(req.userId as string);

        res.cookie("token", "", {expires: new Date(0)});
        res.status(200).json({success: true, msg: "Account deactivate successfully."});
    }catch(err){
        next(err);
    }
}