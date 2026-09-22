import type { Request, Response, NextFunction  } from "express";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
    res.status(500).json({success: false, msg: "Somthing went wrong. please try again later."});
}