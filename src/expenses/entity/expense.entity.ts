import { Expense } from "../dto/expense-create.dto";
import { TDateISO } from "dateISO.type";
import { randomUUID } from "node:crypto";

export class ExpenseEntity {
  id: string;
  name: string;
  amount: number;
  currency: string;
  category: string;
  date: TDateISO;

  constructor(expense: Expense) {
    this.id = randomUUID();
    this.name = expense.name;
    this.amount = expense.amount;
    this.currency = expense.currency;
    this.category = expense.category;
    this.date = new Date().toISOString() as TDateISO;
  }
}
