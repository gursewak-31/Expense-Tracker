import type { ObjectId } from "mongodb"

export type StoredUser = {
    _id: ObjectId,
    firstName: string,
    lastName?: string,
    email: string,
    password: string,
    createdAt: Date,
    profileImage?: string
}

export type NewUser = {
    firstName: string,
    lastName?: string,
    email: string,
    password: string,
    profileImage?: string
}

export type LoginData = {
    email: string,
    password: string
}

export type NewExpense = {
    expense: string,
    amount: number,
    category: string,
    user_id: string
}

export type StoredExpense = {
    id: ObjectId,
    user_id: string,
    expense: string,
    amount: number,
    category: string,
    createdAt: Date
}

export type ExpenseReqQuery = {
    sort: string, 
    order: string,
    search: string, 
    filter: string,
    record: string,
    page: string
}

export type JwtUserPayload = {
    userId: string
}