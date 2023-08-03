import { CodeTextModel } from "../../model/CodeTextModel";
import { Logger } from "../../main/logs/Loger";
import { IMapperText } from "../../model/interfaces/IMapperText";
import { IFileManager } from "../../model/interfaces/IFileManager";

export class RunCodeTextUseCase {
  constructor(
    private mapperText: IMapperText,
    private fileManager: IFileManager
  ) {
    this.mapperText = mapperText;
    this.fileManager = fileManager;
  }

  async execute(codeText: string): Promise<string> {
    try {
      Logger.initialProcessMessage(
        "RunCodeTextUseCase execute method",
        codeText
      );
      const codeResult = await this.processCodeText(codeText);
      Logger.endProcessMessage("RunCodeTextUseCase execute method");
      return codeResult;
    } catch (error) {
      const codeResultRetry = await this.retryRunCode(codeText, error);
      return codeResultRetry;
    }
  }
  private async retryRunCode(
    codeWithError: string,
    _error: any
  ): Promise<string> {
    // const fixedCode = this.codeFixer(codeWithError, error)
    Logger.initialProcessMessage("retryRunCode method", {
      codeWithError,
      errorMessage: _error?.message,
    });
    // Logger.info(`Fix code: ${fixedCode}`);
    const codeResultRetry = await this.processCodeText(codeWithError);
    Logger.endProcessMessage("retryRunCode method", {
      codeWithError,
      errorMessage: _error?.message,
    });
    return codeResultRetry;
  }

  private async processCodeText(codeText: string): Promise<string> {
    Logger.initialProcessMessage("processMessage method", { codeText });
    const resultMapped = this.mapperText.executeMapper(codeText);
    const codeTextModel = new CodeTextModel(resultMapped);
    await this.fileManager.createFile(codeTextModel.text);
    const codeResult = await this.fileManager.executeFile();
    Logger.endProcessMessage("processMessage method", { codeResult });
    return codeResult;
  }
}
