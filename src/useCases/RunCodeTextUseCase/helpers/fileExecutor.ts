import { exec } from 'child_process';
import { promises as fsPromises } from 'fs';
import { promisify } from 'util';

const { unlink } = fsPromises;
const asyncExec = promisify(exec);

export class FileExecutor {
  async executeFile(fileName: string): Promise<string> {
    const prettyCommand = `js-beautify -r ${fileName}`;
    const executeCommand = `node ${fileName}`;

    try {
      await this.executeCommand(prettyCommand);
      const result = await this.executeCommand(executeCommand);
      await this.removeFile(fileName);

      return result.stdout;
    } catch (error) {
      await this.removeFile(fileName);
      throw new Error(error.stderr);
    }
  }

  private async executeCommand(command: string): Promise<{ stdout: string; stderr: string }> {
    try {
      const { stdout, stderr } = await asyncExec(command);
      return { stdout, stderr };
    } catch (error) {
      throw error;
    }
  }

  private async removeFile(fileName: string): Promise<void> {
    try {
      await unlink(fileName);
    } catch (error) {
      throw error;
    }
  }
}
