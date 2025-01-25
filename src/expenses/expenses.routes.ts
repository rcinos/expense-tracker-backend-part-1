import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "./expenses.controller";
import { validateData } from "../helpers/middlewares/validation.middleware";
import {
  ExpenseSchemaValidator,
  UpdateExpenseSchemaValidator,
} from "../config/validator.config";

export const router = express.Router();

router.get("/", getExpenses);

router.post("/", validateData(ExpenseSchemaValidator), createExpense);

router.get("/:id", getExpenseById);

router.patch("/:id", validateData(UpdateExpenseSchemaValidator), updateExpense);

router.delete("/:id", deleteExpense);
