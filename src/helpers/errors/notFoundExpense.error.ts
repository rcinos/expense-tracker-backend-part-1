export class NotFoundExpenseError extends Error {
  constructor() {
    super();
    this.message = "The expense is not found";
    this.name = "NotFoundExpenseError";
  }
}
