import { TDateISO } from "dateISO.type";

export type Expense = {
  id: string;
  name: string;
  amount: number;
  currency: string;
  category: string;
  date: TDateISO;
};
