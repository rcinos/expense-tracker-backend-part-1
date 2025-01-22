import { z } from "zod";

export const ExpenseSchemaValidator = z.object({
  name: z.string(),
  amount: z.number(),
  currency: z.string(),
  category: z.string(),
  date: z.string().datetime(),
}).strict();

export const UpdateExpenseSchemaValidator = ExpenseSchemaValidator.partial();

export const DateISOValidator = z.string().datetime();
