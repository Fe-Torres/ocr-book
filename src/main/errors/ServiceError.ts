import { BaseApplicationError } from "./baseApplicationError";

export class ServiceError extends BaseApplicationError {
  constructor(
    public readonly entity: string,
    message?: string
  ) {
    super(message || `${entity} service error`, 500);
    this.name = "ServiceError";
  }
}
