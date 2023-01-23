import { IInterpreter } from './interpreterDTO'
import { executeFile } from './functions/executeFile'
import * as fs from 'fs'

export class InterpreterText {
  async execute(interpreterData: IInterpreter) {
    try {
      const fileName = `${Math.random().toString(16).slice(2)}.js`
      await fs.writeFileSync(fileName, interpreterData.text)
      const response = await executeFile(fileName)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}
