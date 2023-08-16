import { CodeTextModel } from "../../model/CodeTextModel";
import { Logger } from "../../main/logs/Loger";
import { IMapperText } from "../../model/interfaces/IMapperText";
import { IFileManager } from "../../model/interfaces/IFileManager";
import { ICodeFixer } from "../../model/interfaces/ICodeFixer";

export class RunCodeTextUseCase {
  constructor(
    private mapperText: IMapperText,
    private fileManager: IFileManager,
    private codeFixer: ICodeFixer
  ) {
    this.mapperText = mapperText;
    this.fileManager = fileManager;
    this.codeFixer = codeFixer;
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
      Logger.warn(error.message);
      const codeResultRetry = await this.retryRunCode(codeText);
      return codeResultRetry;
    }
  }
  private async retryRunCode(codeWithError: string): Promise<string> {
    const { correctedCode } = await this.codeFixer.fixCode(codeWithError);
    const codeResultRetry = await this.processCodeText(correctedCode);
    Logger.initialProcessMessage("retryRunCode method", {
      correctedCode,
    });
    Logger.endProcessMessage("retryRunCode method", {
      codeResultRetry,
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
