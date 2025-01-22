import { Request, Response } from "express";
import {
  createExpenseService,
  deleteExpenseService,
  getExpenseByIdService,
  getExpensesService,
  updateExpenseService,
} from "./expenses.service";
import { validateQueries } from "../helpers/validateQueries";
import { NotFoundExpenseError } from "../helpers/errors/notFoundExpense.error";
import { logger } from "../helpers/logger";

export async function getExpenses(req: Request, res: Response) {
  try {
    const options = validateQueries(req.query);
    const expenses = await getExpensesService(options);
    res.json(expenses);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`getExpenses - error: ${err.name}`);
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createExpense(req: Request, res: Response) {
  try {
    const expenseData = req.body;
    const expense = await createExpenseService(expenseData);
    res.json(expense);
    console.log("New Expense has been created");
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`create Expense - error: ${err.name}`);
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getExpenseById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const expense = await getExpenseByIdService(id);
    res.json(expense);
  } catch (err) {
    err instanceof Error &&
      logger.error(`get Expense by id - error: ${err.name}`);
    if (err instanceof NotFoundExpenseError) {
      res.status(404).json({ message: "Expense not found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export async function updateExpense(req: Request, res: Response) {
  try {
    const data = req.body;
    const expense = await updateExpenseService(data, req.params.id);
    res.json(expense);
  } catch (err) {
    err instanceof Error &&
      logger.error(`update Expense by id - error: ${err.name}`);
    if (err instanceof NotFoundExpenseError) {
      res.status(404).json({ message: "Expense not found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export async function deleteExpense(req: Request, res: Response) {
  try {
    const expense = await deleteExpenseService(req.params.id);
    res.json({ success: true, expense });
  } catch (err) {
    err instanceof Error &&
      logger.error(`update Expense by id - error: ${err.name}`);
    if (err instanceof NotFoundExpenseError) {
      res.status(404).json({ message: "Expense not found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
