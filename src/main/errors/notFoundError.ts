import { BaseApplicationError } from "./baseApplicationError";

export class NotFoundApplicationError extends BaseApplicationError {
  constructor(
    message: string,
    public readonly entity?: string
  ) {
    super(message || `${entity} not found`, 404);
    this.name = "NotFoundApplicationError";
  }
}
