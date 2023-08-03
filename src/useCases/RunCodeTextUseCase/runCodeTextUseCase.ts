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
    Logger.processMessage(
      "RunCodeTextUseCase execute method",
      ActionLog.INITIAL,
      codeText
    );
    const resultMapped = this.mapperText.executeMapper(codeText);
    const codeTextModel = new CodeTextModel(resultMapped);
    await this.fileManager.createFile(codeTextModel.text);
    const codeResult = await this.fileManager.executeFile();

    Logger.processMessage("RunCodeTextUseCase execute method", ActionLog.END);

    return codeResult;
  }

  // private async retryRunCode(error: string): Promise<string> {
  //   const codeFixer = new CodeFixer(error, this.resultMapped);
  //   this.resultMapped = await codeFixer.fixCode();
  //   await this.createFile();
  //   return;
  // }
}
