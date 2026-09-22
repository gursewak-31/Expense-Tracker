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

export default async function connectDB(){
    try{
        await conn.connect();

        const db = conn.db("Expense-Tracker-DB");

        return db;
    }catch(err){
        console.log(err);
    }
}