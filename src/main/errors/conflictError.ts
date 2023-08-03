import { BaseApplicationError } from "./baseApplicationError";

export class ConflictApplicationError extends BaseApplicationError {
  constructor(message?: string) {
    super(message, 409);
    this.name = "ConflictApplicationError";
  }
}
