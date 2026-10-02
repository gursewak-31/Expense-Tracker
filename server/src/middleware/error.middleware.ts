import type { Request, Response, NextFunction  } from "express";
import AppError from "../errors/appError.js";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){

    if(err instanceof AppError){
        res.status(err.statusCode).json({
            success: false,
            msg: err.message
        });
        return;
    }

    res.status(500).json({
        success: false, 
        msg: "Somthing went wrong. please try again later."}
    );
}