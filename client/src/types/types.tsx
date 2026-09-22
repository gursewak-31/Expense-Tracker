import type React from "react"

export type User = {
    _id: string,
    firstName: string,
    lastName?: string,
    email: string,
    profileImage?: string,
    createdAt: Date
}

export type UserContext = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export type ChartData = {
    _id: "String",
    total: number
}
export type AllowedPages = "/dashboard" | "/addExpense" | "/allExpenses" | "/accountSettings" | "/profile";

export type expense = {
    _id: string,
    expense: string,
    amount: number,
    category: string,
    createdAt?: Date
}
export type expenseCateogry = "all" | "shopping" | "food" | "entertainment" | "travel" | "other";
export type entriesPP = "5" | "10" | "50" | "100" | "all";