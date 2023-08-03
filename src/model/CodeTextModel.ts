import { ServiceError } from "../main/errors/ServiceError";
import { Logger } from "../main/logs/Loger";

export class CodeTextModel {
  text: string;

  constructor(text: string) {
    this.text = text;

    if (this.isPotentiallyMaliciousCode(this.text)) {
      Logger.warn(`Potentiall malicious code: ${this.text}`);
      throw new ServiceError(
        "CodeTextModel",
        "Potentially malicious code detected. File creation aborted."
      );
    }
  }

  private isPotentiallyMaliciousCode(code: string): boolean {
    const sanitizedCode = code.toLowerCase();
    const dangerousKeywords = [
      "eval",
      "exec",
      "require",
      "child_process",
      "fs",
      "spawn",
      "execSync",
      "execFile",
    ];

    for (const keyword of dangerousKeywords) {
      if (sanitizedCode.includes(keyword)) {
        return true;
      }
    }

    // Verifica comandos específicos ou padrões maliciosos
    const maliciousCommands = [
      /child_process\.exec\(/,
      /child_process\.execSync\(/,
      /child_process\.execFile\(/,
      /fs\./,
      /spawn\(/,
      /`(?:\$\(.*?\)|`.+?`)/,
    ];

    for (const command of maliciousCommands) {
      if (command.test(sanitizedCode)) {
        return true;
      }
    }

    return false;
  }
}
