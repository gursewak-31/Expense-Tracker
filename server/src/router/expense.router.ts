import express from "express";
import * as expenseController from "../controller/expense.controller.js";

const router = express.Router();

router.post("/", (req, res, next) => {
    expenseController.addExpense(req, res, next);
});

router.get("/", expenseController.getExpense);

router.get("/data", (req, res, next) => {
    expenseController.getData(req, res, next);
});

export default router;