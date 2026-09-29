import express from "express";
import * as expenseController from "../controller/expense.controller.js";

const router = express.Router();

router.post("/", expenseController.addExpense);

router.get("/", expenseController.getExpense);

router.get("/data", expenseController.getData);

router.post("/update", expenseController.updateExpense);

router.delete("/:id", expenseController.deleteExpense);

export default router;