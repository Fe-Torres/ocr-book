export interface IFileManager {
  createFile(_codeText: string): Promise<void>;
  executeFile(): Promise<string>;
}
