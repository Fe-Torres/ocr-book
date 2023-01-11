import { InterpreterTextController } from './textInterpreterController/interpreterController'
import { InterpreterText } from '../../../useCases/interpreterUseCase/interpreterUseCase'
import { ReadImgController } from './readImgController/readImgController'
import { ReadImg } from '../../../useCases/readImgUseCase/readImgUseCase'
import { TesseractOcr } from '../../../services/ocr-service/implementation/tesseract/main'

const interpreterTextController = new InterpreterTextController(new InterpreterText())

const readImgUseCase = new ReadImg(new TesseractOcr())
const readImgController = new ReadImgController(readImgUseCase)

export { interpreterTextController, readImgController }
