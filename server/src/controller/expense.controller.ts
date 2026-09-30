import type { Request, Response, RequestHandler, NextFunction } from "express";
import * as expenseService from "../service/expense.service.js"
import type { ExpenseReqQuery } from "../types/types.js";

export async function addExpense(req: Request, res: Response, next: NextFunction){
    try{
        let data = {...req.body, user_id: req.userId}
        let result = await expenseService.addExpense(data);

        if(result.statusCode == 422){
            res.status(422).json({success: false, msg: "Invalid date. Please fill valid data !"});
            return;
        }

        res.status(200).json({success: true, msg: "expense added successfuly"});
    }catch(err){
        next(err);
    }
}

export async function getExpense(req: Request<{}, {}, {}, ExpenseReqQuery>, res: Response, next: NextFunction){
    try{
        let data = req.query;
        let result = await expenseService.getExpense(data, req.userId as string);

        res.status(200).json({success: true, data: result.data, totalRecords: result.totalRecords});
    }catch(err){
        next(err);
    }
}

export async function getData(req: Request, res: Response, next: NextFunction){
    try{
        let data = await expenseService.getData(req.userId as string);

        res.status(200).json({success: true, data: data});
    }catch(err){
        next(err);
    }
}

export async function updateExpense(req: Request, res: Response, next: NextFunction){
    try{
        let result = await expenseService.updateExpense(req.body);

        if(result.statusCode == 422){
            res.status(422).json({success: false, msg: "Invalid date. Please fill valid data !"});
            return;
        }

        res.status(200).json({success: true, msg: result.msg});
    }catch(err){
        next(err);
    }
}

export async function deleteExpense(req: Request, res: Response, next: NextFunction){
    try{
        let result = await expenseService.deleteExpense(req.params.id as string);

        res.status(200).json({success: true, msg: result.msg});
    }catch(err){
        next(err);
    }
}