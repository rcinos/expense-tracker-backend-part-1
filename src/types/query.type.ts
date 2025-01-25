import { TDateISO } from "dateISO.type";

export type Query = {
  offset?: string;
  limit?: string;
  fromDate?: string;
  toDate?: string;
};

export type ValidatedQuery = {
  offset: number;
  limit: number;
  fromDate: TDateISO;
  toDate: TDateISO;
};
