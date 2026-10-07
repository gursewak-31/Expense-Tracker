import type { ObjectId } from "mongodb"

export interface StoredUser{
    _id: ObjectId,
    firstName: string,
    lastName?: string,
    email: string,
    createdAt: Date,
    profileImage?: string
}

export interface NewUser{
    firstName: string,
    lastName?: string,
    email: string,
    password: string,
    profileImage?: string
}

export interface UpdateUser{
    firstName?: string,
    lastName?: string,
    email?: string,
}

export interface LoginData{
    email: string,
    password: string
}

export interface NewExpense{
    expense: string,
    amount: number,
    category: string,
    user_id: string
}

export interface StoredExpense{
    id: ObjectId,
    user_id: string,
    expense: string,
    amount: number,
    category: ExpenseCategory,
    createdAt: Date
}

export type ExpenseCategory = "shopping" | "food" | "entertainment" | "travel" | "other";

export interface ExpenseReqQuery{
    sort: string, 
    order: string,
    search: string, 
    filter: string,
    record: string,
    page: string
}

export interface UpdateExpense{
    id: string,
    expense?: string,
    amount?: number,
    category?: ExpenseCategory
}

export interface JwtUserPayload{
    userId: string
}