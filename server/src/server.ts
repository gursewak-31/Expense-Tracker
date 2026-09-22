import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./router/auth.router.js";
import expenseRouter from "./router/expense.router.js";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/auth.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const server = express();

server.use(express.json());

server.use(cookieParser());

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Type", "application/json");
    
    if(req.method == "OPTIONS"){
        res.status(204).send();
        return;
    }
    
    next();
})

server.use(authMiddleware);

server.use("/files", express.static(path.join(process.cwd(), "../uploads")));

server.use("/auth", authRouter);

server.use("/expense", expenseRouter);

server.use(errorHandler);

let envPath = path.join(import.meta.dirname, "../.env");
dotenv.config({
    path: envPath
})

server.listen(process.env.PORT, () => console.log("server start"));