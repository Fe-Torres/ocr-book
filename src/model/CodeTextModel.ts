import { promises as fsPromises } from 'fs';

const { writeFile } = fsPromises;

export class CodeTextModel {
  constructor(private text: string) {}

  async createFile(fileName: string): Promise<void> {
    if (this.isPotentiallyMaliciousCode(this.text)) {
      throw new Error(
        'Potentially malicious code detected. File creation aborted.'
      );
    }

    try {
      await writeFile(fileName, this.text);
    } catch (error) {
      throw new Error(`Failed to create file: ${error}`);
    }
  }

  private isPotentiallyMaliciousCode(code: string): boolean {
    const sanitizedCode = code.toLowerCase();
    const dangerousKeywords = [
      'eval',
      'exec',
      'require',
      'child_process',
      'fs',
      'spawn',
      'execSync',
      'execFile'
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
      /`(?:\$\(.*?\)|`.+?`)/
    ];

    for (const command of maliciousCommands) {
      if (command.test(sanitizedCode)) {
        return true;
      }
    }

    return false;
  }
}
