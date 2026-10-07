import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

let envPath = path.join(import.meta.dirname, "../../.env");
dotenv.config({
    path: envPath
});

const uri = process.env.URI;

if(!uri){
    throw new Error("Undefined URI");
}

const conn = new MongoClient(uri);

export async function connectDB(){
    try{
        await conn.connect();

        const db = conn.db("Expense-Tracker-DB");

        return db;
    }catch(err){
        throw new Error("Database connection failed.");
    }
}

export async function closeDB(){
    try{
        await conn.close();
    }catch(err){
        throw new Error("Failed to close database connection.");
    }
}