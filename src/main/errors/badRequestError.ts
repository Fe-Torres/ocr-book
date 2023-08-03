import { BaseApplicationError } from "./baseApplicationError";

export class BadRequestApplicationError extends BaseApplicationError {
  constructor(
    public readonly entity: string,
    message?: string
  ) {
    super(message || `${entity} bad request`, 400);
    this.name = "BadRequestApplicationError";
  }
}
