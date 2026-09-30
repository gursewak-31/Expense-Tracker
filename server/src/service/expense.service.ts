import type { NewExpense, StoredExpense, ExpenseReqQuery, UpdateExpense } from "../types/types.js";
import * as actions from "../database/expense.dbActions.js";

export async function addExpense(data: NewExpense){
    if(data.expense.trim() == "" ||  !Number.isFinite(data.amount) || data.category.trim() == ""){
        return {statusCode: 422};
    }

    let expenseId = await actions.insertExpense(data);

    if(expenseId){
        return {statusCode: 200, new_id: expenseId}
    }

    throw new Error("failed to add expense");
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
        return {statusCode: 422};
    }

    let result = await actions.updateExpense(data);

    if(result){
        return {statusCode: 200, msg: "Expense updated successfully."};
    }

    throw new Error("Failed to updated expense.");
}

export async function deleteExpense(id: string){
    let result = await actions.deleteExpense(id);

    if(result){
        return {statusCode: 200, msg: "Expense deleted successfully."}
    }

    throw new Error("failed to delete expense.");
}