import type { Request, Response, RequestHandler, NextFunction } from "express";
import * as expenseService from "../service/expense.service.js"
import type { ExpenseReqQuery } from "../types/types.js";

export async function addExpense(req: Request, res: Response, next: NextFunction){
    try{
        let data = {...req.body, user_id: req.userId}
        await expenseService.addExpense(data);

        res.status(200).json({success: true, msg: "Expense added successfuly."});
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
        await expenseService.updateExpense(req.body);

        res.status(200).json({success: true, msg: "Expense update successfully."});
    }catch(err){
        next(err);
    }
}

export async function deleteExpense(req: Request, res: Response, next: NextFunction){
    try{
        await expenseService.deleteExpense(req.params.id as string);

        res.status(200).json({success: true, msg: "Expense deleted successfully."});
    }catch(err){
        next(err);
    }
}