import { BaseApplicationError } from "./baseApplicationError";

export class ServiceError extends BaseApplicationError {
  constructor(
    message: string,
    public readonly entity?: string
  ) {
    super(message || `${entity} service error`, 500);
    this.name = "ServiceError";
  }
}
