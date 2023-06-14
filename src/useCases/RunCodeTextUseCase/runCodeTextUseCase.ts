import { FileExecutor } from './helpers/fileExecutor';
import { promises as fsPromises } from 'fs';
import { ICodeText } from '../../model/interfaces/codeTextDTO';
import { MapperText } from './helpers/mapperText';

const { writeFile } = fsPromises;

export class RunCodeTextUseCase {
  async execute(codeTextData: ICodeText): Promise<string> {
    try {
      const text = codeTextData.text;
      const fileName = `${Math.random().toString(16).slice(2)}.js`;
      const resultMapped = MapperText.executeMapper(text);
      await writeFile(fileName, resultMapped);

      const fileExecutor = new FileExecutor();
      return await fileExecutor.executeFile(fileName);
    } catch (error) {
      throw error;
    }
  }
}
