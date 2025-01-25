import { prisma } from "../config/prisma.config";
import { Expense } from "./dto/expense-create.dto";
import { ExpenseEntity } from "./entity/expense.entity";
import { ValidatedQuery } from "query.type";
import { NotFoundExpenseError } from "../helpers/errors/notFoundExpense.error";

export async function getExpensesService(options: ValidatedQuery) {
  return prisma.expense.findMany({
    skip: options.offset,
    take: options.limit,
    where: {
      date: {
        lt: options.toDate,
        gt: options.fromDate,
      },
    },
  });
}

export async function createExpenseService(data: Expense) {
  const expenseEntity = new ExpenseEntity(data);
  await prisma.expense.create({ data: expenseEntity });
  return expenseEntity;
}

export async function getExpenseByIdService(id: string) {
  const expense = await prisma.expense.findUnique({ where: { id: id } });
  if (!expense) {
    throw new NotFoundExpenseError();
  }
  return expense;
}

export async function updateExpenseService(data: Partial<Expense>, id: string) {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) {
    throw new NotFoundExpenseError();
  }
  return prisma.expense.update({
    where: { id },
    data: data,
  });
}

export async function deleteExpenseService(id: string) {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) {
    throw new NotFoundExpenseError();
  }
  return prisma.expense.delete({ where: { id } });
}
