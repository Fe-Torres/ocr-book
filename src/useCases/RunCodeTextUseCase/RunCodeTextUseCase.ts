import { executeFile } from './helpers/executeFile';
import * as fs from 'fs';
import { ICodeText } from '../../model/interfaces/codeTextDTO';
import { MapperText } from './helpers/main';

export class RunCodeTextUseCase {
  async execute(codeTextData: ICodeText): Promise<string> {
    try {
      const text = codeTextData.text;
      const fileName = `${Math.random().toString(16).slice(2)}.js`;
      const result_mapped = MapperText.executeMapper(text);
      console.log(result_mapped);
      await Promise.resolve(fs.writeFileSync(fileName, result_mapped));
      return await executeFile(fileName);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
  private format() {
    // Adicionar o código de mapper aqui
  }
}
