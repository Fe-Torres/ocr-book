import { BaseApplicationError } from "./baseApplicationError";

export class ConflictApplicationError extends BaseApplicationError {
  constructor(
    message: string,
    public readonly entity?: string
  ) {
    super(message || `${entity} conflict error`, 409);
    this.name = "ConflictApplicationError";
  }
}
