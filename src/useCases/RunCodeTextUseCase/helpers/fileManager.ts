import { exec } from "child_process";
import { unlink, writeFile } from "fs/promises";
import { promisify } from "util";
import { ServiceError } from "../../../main/errors/ServiceError";
import { IFileManager } from "../../../model/interfaces/IFileManager";
import { js_beautify } from "js-beautify";

const asyncExec = promisify(exec);

export class FileManager implements IFileManager {
  private fileName: string;
  private basePath: string;

  constructor() {
    this.fileName = `${Math.random().toString(16).slice(2)}.js`;
    this.basePath = `/tmp/${this.fileName}`;
  }

  async createFile(codeText: string): Promise<void> {
    try {
      const codeTextParsed = js_beautify(codeText);
      await writeFile(this.basePath, codeTextParsed);
    } catch (error) {
      throw new ServiceError(`Failed to create file: ${error}`);
    }
  }
  async executeFile(): Promise<string> {
    const executeCommand = `node ${this.basePath}`;

    try {
      const result = await this.executeCommand(executeCommand);
      await this.removeFile();
      return result.stdout;
    } catch (error) {
      await this.removeFile();
      throw new ServiceError(`Failed to execute file: ${error}`);
    }
  }
  private async removeFile(): Promise<void> {
    try {
      await unlink(this.basePath);
    } catch (error) {
      throw new ServiceError(`Failed to remove file: ${error}`);
    }
  }
  private async executeCommand(
    command: string
  ): Promise<{ stdout: string; stderr: string }> {
    try {
      const { stdout, stderr } = await asyncExec(command);
      return { stdout, stderr };
    } catch (error) {
      throw new ServiceError(
        `Failed to executeCommand ${command} error: ${error}`
      );
    }
  }
}
