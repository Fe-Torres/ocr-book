import { BaseApplicationError } from "./baseApplicationError";

export class NotFoundApplicationError extends BaseApplicationError {
  constructor(
    public readonly entity: string,
    message?: string
  ) {
    super(message || `${entity} not found`, 404);
    this.name = "NotFoundApplicationError";
  }
}
