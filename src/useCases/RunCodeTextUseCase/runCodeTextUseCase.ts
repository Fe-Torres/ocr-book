import { FileExecutor } from './helpers/fileExecutor';
import { ICodeText } from '../../model/interfaces/codeTextDTO';
import { MapperText } from './helpers/mapperText';
import { CodeTextModel } from '../../model/CodeTextModel';
import { CodeFixer } from './helpers/codeFixer';

export class RunCodeTextUseCase {
  private resultMapped: string;

  async execute(codeTextData: ICodeText): Promise<string> {
    try {
      const text = codeTextData.text;
      this.resultMapped = MapperText.executeMapper(text);
      const result = await this.createAndExecuteFile();
      return result;
    } catch (error) {
      return this.retryRunCode(error);
    }
  }

  private async createAndExecuteFile(): Promise<string> {
    const fileName = `${Math.random().toString(16).slice(2)}.js`;
    const codeTextModel = new CodeTextModel(this.resultMapped);
    await codeTextModel.createFile(fileName);

    const fileExecutor = new FileExecutor();
    return fileExecutor.executeFile(fileName);
  }

  private async retryRunCode(error: string): Promise<string> {
    const codeFixer = new CodeFixer(error, this.resultMapped);
    this.resultMapped = await codeFixer.fixCode();
    return this.createAndExecuteFile();
  }
}
