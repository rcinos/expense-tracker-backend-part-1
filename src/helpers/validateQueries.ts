import { Query, ValidatedQuery } from "query.type";
import { DateISOValidator } from "../config/validator.config";

export function validateQueries(queries: Query) {
  let options = {};
  const { offset, limit, fromDate, toDate } = queries;
  if (typeof offset === "string" && !Number.isNaN(parseInt(offset))) {
    options = { offset: parseInt(offset) };
  } else if (typeof limit === "string" && !Number.isNaN(parseInt(limit))) {
    options = { ...options, limit: parseInt(limit) };
  } else if (
    typeof fromDate === "string" &&
    DateISOValidator.safeParse(fromDate).success
  ) {
    options = { ...options, fromDate: parseInt(fromDate) };
  } else if (
    typeof toDate === "string" &&
    DateISOValidator.safeParse(toDate).success
  ) {
    options = { ...options, toDate: parseInt(toDate) };
  }
  return options as ValidatedQuery;
}
