import { InterpreterTextController } from '../adapters/http/controllers/textInterpreterController/interpreterController'
import { InterpreterText } from './interpreterUseCase/interpreterUseCase'

const interpreterTextController = new InterpreterTextController(new InterpreterText())
export { interpreterTextController }
