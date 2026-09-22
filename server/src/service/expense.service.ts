import type { NewExpense, StoredExpense, ExpenseReqQuery } from "../types/types.js";
import * as actions from "../database/expense.dbActions.js";

export async function addExpense(data: NewExpense){
    if(data.expense == "" ||  !Number.isFinite(data.amount) || data.category == ""){
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