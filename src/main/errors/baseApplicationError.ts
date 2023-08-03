import { Logger } from "../logs/Loger";

export class BaseApplicationError extends Error {
  public code: number;

  constructor(message: string, code: number) {
    Logger.error(message);
    super(message);
    this.code = code;
    this.name = "BaseApplicationError";
  }
}
