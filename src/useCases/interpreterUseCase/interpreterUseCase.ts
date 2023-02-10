import { IInterpreter } from './interpreterDTO';
import { executeFile } from './functions/executeFile';
import * as fs from 'fs';
import { MapperText } from '../../mapper/main';

export class InterpreterText {
  async execute(interpreterData: IInterpreter) {
    try {
      const text = interpreterData.text;
      const fileName = `${Math.random().toString(16).slice(2)}.js`;
      const mapper = new MapperText(text);
      const result_mapped = mapper.executeMapper();
      await fs.writeFileSync(fileName, result_mapped);
      const response = await executeFile(fileName);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
