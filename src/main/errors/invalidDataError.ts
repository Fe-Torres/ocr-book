import { BaseApplicationError } from "./baseApplicationError";

export class InvalidDataError extends BaseApplicationError {
  constructor(
    message: string,
    public readonly entity?: string
  ) {
    super(message || `${entity} invalid data error`, 400);
    this.name = "InvalidDataError";
  }
}
