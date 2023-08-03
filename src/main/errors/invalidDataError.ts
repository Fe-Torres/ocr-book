import { BaseApplicationError } from "./baseApplicationError";

export class InvalidDataError extends BaseApplicationError {
  constructor(
    public readonly entity: string,
    message?: string
  ) {
    super(message || `${entity} invalid data error`, 400);
    this.name = "InvalidDataError";
  }
}
