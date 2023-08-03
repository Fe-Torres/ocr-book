import { BaseApplicationError } from "./baseApplicationError";

export class BadRequestApplicationError extends BaseApplicationError {
  constructor(
    message: string,
    public readonly entity?: string
  ) {
    super(message || `${entity} bad request`, 400);
    this.name = "BadRequestApplicationError";
  }
}
