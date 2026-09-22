import type { NextFunction, Request, Response } from "express";
import type { JwtUserPayload } from "../types/types.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

let envPath = path.join(import.meta.dirname, "../../.env");
dotenv.config({
    path: envPath
});

const jwtKey = process.env.SECRET_KEY;

export default function authMiddleware(req:Request, res:Response, next:NextFunction){
    if(req.url != "/auth/login" && req.url != "/auth/signup"){
        let token = req.cookies.token;

        if(!token){
            res.status(401).json({success: false, msg: "Cookie expire. please login again."});
            return;
        }
        if(!jwtKey){
            res.status(500).json({success: false, msg: "Somthing went wrong. please try again later."});
            return;
        }

        let decoded = jwt.verify(token, jwtKey) as JwtUserPayload;
        req.userId = decoded.userId;
    }

    next();
}