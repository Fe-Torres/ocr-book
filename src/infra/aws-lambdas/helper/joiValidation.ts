import { Schema, ValidationResult } from "joi";
import { BadRequestApplicationError } from "../../../main/errors/badRequestError";

export class JoiValidator {
  static validate(obj: unknown, schema: Schema): void {
    const result: ValidationResult = schema.validate(obj);

    if (result.error) {
      throw new BadRequestApplicationError(
        `Validation error: ${result.error.message}`
      );
    }
  }
}
