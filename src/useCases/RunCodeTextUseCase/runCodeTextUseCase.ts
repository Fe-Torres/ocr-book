import { CodeTextModel } from "../../model/CodeTextModel";
import { ActionLog, Logger } from "../../main/logs/Loger";
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
      Logger.processMessage(
        "RunCodeTextUseCase execute method",
        ActionLog.INITIAL,
        codeText
      );
      const codeResult = await this.processCodeText(codeText);
      Logger.processMessage("RunCodeTextUseCase execute method", ActionLog.END);
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
    Logger.processMessage("retryRunCode method", ActionLog.INITIAL, {
      codeWithError,
      errorMessage: _error?.message,
    });
    // Logger.info(`Fix code: ${fixedCode}`);
    const codeResultRetry = await this.processCodeText(codeWithError);
    Logger.processMessage("retryRunCode method", ActionLog.INITIAL, {
      codeWithError,
      errorMessage: _error?.message,
    });
    return codeResultRetry;
  }

  private async processCodeText(codeText: string): Promise<string> {
    Logger.processMessage("processMessage method", ActionLog.INITIAL, {
      codeText,
    });
    const resultMapped = this.mapperText.executeMapper(codeText);
    const codeTextModel = new CodeTextModel(resultMapped);
    await this.fileManager.createFile(codeTextModel.text);
    const codeResult = await this.fileManager.executeFile();
    Logger.processMessage("processMessage method", ActionLog.END, {
      codeResult,
    });
    return codeResult;
  }
}
