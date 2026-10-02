import type { NewExpense, StoredExpense, ExpenseReqQuery, UpdateExpense } from "../types/types.js";
import * as actions from "../database/expense.dbActions.js";
import AppError from "../errors/appError.js";

export async function addExpense(data: NewExpense){
    if(data.expense.trim() == "" ||  !Number.isFinite(data.amount) || data.category.trim() == ""){
        throw new AppError(422, "Invalid date. Please fill valid data !");
    }

    let expenseId = await actions.insertExpense(data);

    if(expenseId) return; // if expense id then mean expense added successfully

    throw new Error("Failed to add expense.");
}

export async function getExpense(data: ExpenseReqQuery, userId: string){
    let result = await actions.getExpense(data, userId);

    return {data: result?.data, totalRecords: result?.totalRecords};
}

export async function getData(id: string){
    let result = await actions.getData(id);

    return result;
}

export async function updateExpense(data: UpdateExpense){
    if((data.expense !== undefined && data.expense.trim() == "") ||
    (data.amount !== undefined && (!Number.isFinite(data.amount) || data.amount <= 0)) ||
    (data.category !== undefined && data.category.trim() == "")){
        throw new AppError(422, "Invalid date. Please fill valid data !");
    }

    let result = await actions.updateExpense(data);

    if(result) return; // expense added successfully

    throw new Error("Failed to updated expense.");
}

export async function deleteExpense(id: string){
    let result = await actions.deleteExpense(id);

    if(result) return; // expense deleted

    throw new Error("Failed to delete expense.");
}