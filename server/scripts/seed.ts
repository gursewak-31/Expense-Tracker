import { connectDB, closeDB } from "../src/database/dbConn";
import bcrypt from "bcrypt";

let db = await connectDB();

let users = db?.collection("users");

let newPassword = "12345678";
newPassword = await bcrypt.hash(newPassword, 12);

let newUser = await users?.insertOne({
    firstName: "test",
    lastName: "test",
    email: "test@gmail.com",
    password: newPassword,
    createdAt: new Date()
});

let newID = String(newUser?.insertedId);

let expenses = db?.collection("expenses");

let currentData = new Date();

await expenses?.insertMany([
    {
        user_id: newID,
        expense: "petrol",
        amount: 120,
        category: "travel",
        createdAt: new Date(new Date(currentData).setDate(currentData.getDate() - 4))
    },
    {
        user_id: newID,
        expense: "burger",
        amount: 80,
        category: "food",
        createdAt: new Date(new Date(currentData).setDate(currentData.getDate() - 3))
    },
    {
        user_id: newID,
        expense: "t shirt",
        amount: 350,
        category: "shopping",
        createdAt: new Date(new Date(currentData).setDate(currentData.getDate() - 2))
    },
    {
        user_id: newID,
        expense: "rent",
        amount: 800,
        category: "other",
        createdAt: new Date(new Date(currentData).setDate(currentData.getDate() - 1))
    },
    {
        user_id: newID,
        expense: "recharge",
        amount: 299,
        category: "entertainment",
        createdAt: currentData
    }
]);

await closeDB();