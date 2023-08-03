import { exec } from "child_process";
import { unlink, writeFile } from "fs/promises";
import { promisify } from "util";
import { ServiceError } from "../../../main/errors/ServiceError";

const asyncExec = promisify(exec);

export class FileManager {
  private fileName: string;
  private basePath: string;

  constructor(private codeText: string) {
    this.codeText = codeText;
    this.fileName = `${Math.random().toString(16).slice(2)}.js`;
    this.basePath = `/tmp/${this.fileName}`;
  }

  async createFile(): Promise<void> {
    try {
      await writeFile(this.basePath, this.codeText);
    } catch (error) {
      throw new ServiceError(`Failed to create file: ${error}`);
    }
  }
  async executeFile(): Promise<string> {
    // const prettyCommand = `js-beautify -r ${fileName}`;
    const executeCommand = `node ${this.basePath}`;

    try {
      // await this.executeCommand(prettyCommand);
      const result = await this.executeCommand(executeCommand);
      // await this.removeFile();
      return result.stdout;
    } catch (error) {
      // await this.removeFile();
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
