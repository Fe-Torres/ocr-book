import { FileManager } from "./helpers/fileManager";
import { MapperText } from "./helpers/mapperText";
import { CodeTextModel } from "../../model/CodeTextModel";
import { ActionLog, Logger } from "../../main/logs/Loger";

export class RunCodeTextUseCase {
  constructor() {}

  async execute(codeText: string): Promise<string> {
    Logger.processMessage(
      "RunCodeTextUseCase execute method",
      ActionLog.INITIAL,
      codeText
    );
    const resultMapped = MapperText.executeMapper(codeText);
    const codeTextModel = new CodeTextModel(resultMapped);
    const fileManager = new FileManager(codeTextModel.text);
    await fileManager.createFile();
    const codeResult = await fileManager.executeFile();

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
