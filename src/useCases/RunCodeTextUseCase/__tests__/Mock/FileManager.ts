import { IFileManager } from "../../../../model/interfaces/IFileManager";

export class MockFileManager implements IFileManager {
  private createdFileContent: string = "";

  async createFile(codeText: string): Promise<void> {
    this.createdFileContent = codeText;
  }

  async executeFile(): Promise<string> {
    return "Mock Result ExecuteFile";
  }
}
