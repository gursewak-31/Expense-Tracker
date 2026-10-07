import type React from "react"

export interface User {
    _id: string,
    firstName: string,
    lastName?: string,
    email: string,
    profileImage?: string,
    createdAt: Date
}

export interface UpdateUser {
    firstName?: string,
    lastName?: string,
    email?: string
}

export interface UserContext {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export interface ChartData {
    _id: "String",
    total: number
}
export type AllowedPages = "/dashboard" | "/addExpense" | "/allExpenses" | "/accountSettings" | "/profile";

export interface StoredExpense {
    _id: string,
    expense: string,
    amount: number,
    category: string,
    createdAt: Date
}
export type ExpenseCateogry = "all" | "shopping" | "food" | "entertainment" | "travel" | "other";
export type EntriesPP = "5" | "10" | "50" | "100" | "all";

export interface NewExpense {
    expense: string,
    amount: number,
    category: string
}

export interface UpdateExpense {
    expense?: string,
    amount?: number,
    category?: string
}