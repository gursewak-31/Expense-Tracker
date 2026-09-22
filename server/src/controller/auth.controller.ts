import type { Request, Response, NextFunction } from "express";
import * as authService from "../service/auth.service.js";

export async function signup(req: Request, res: Response, next: NextFunction){
    try{
        let result = await authService.signup(req.body);

        if(result.statusCode == 422){
            res.status(422).json({success: false, msg: "Please enter valid data !"});
            return;
        }

        if(result.statusCode == 409){
            res.status(409).json({success: false, msg: "Email address already exist !"});
            return;
        }

        res.cookie("token", result.token, {
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
        let result = await authService.login(req.body);

        if(result.statusCode == 422){
            res.status(422).json({success: false, msg: "Please enter valid data !"});
            return;
        }
        if(result.statusCode == 404){
            res.status(404).json({success: false, msg: "Invalid email or password."});
            return;
        }

        res.cookie("token", result.token, {
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
        let result = await authService.updateProfileImage(req.body.profileImage, req.body.oldImageName, req.userId as string);

        res.status(200).json({success: true, msg: result.msg, image: result.image});
    }catch(err){
        next(err);
    }
}

export async function updateData(req: Request, res: Response, next: NextFunction){
    try{
        let result = await authService.updateData(req.body, req.userId as string);

        res.status(200).json({success: true, msg: result.msg});
    }catch(err){
        next(err);
    }
}

export async function updatePassword(req: Request, res: Response, next: NextFunction){
    try{
        let result = await authService.updatePassword(req.body, req.userId as string);

        if(result.statusCode != 200){
            res.status(result.statusCode).json({success: false, msg: result.msg});
            return;
        }

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
        res.status(200).json({success: true, msg: result.msg});
    }catch(err){
        next(err);
    }
}