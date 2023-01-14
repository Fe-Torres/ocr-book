import { InterpreterTextController } from './textInterpreterController/interpreterController'
import { InterpreterText } from '../../../useCases/interpreterUseCase/interpreterUseCase'
import { ReadImgController } from './readImgController/readImgController'
import { ReadImg } from '../../../useCases/readImgUseCase/readImgUseCase'
import { TesseractOcr } from '../../../services/ocr-service/implementation/tesseract/main'
import { MicrosoftOcr } from '../../../services/ocr-service/implementation/microsoft-ocr/main'

const interpreterTextController = new InterpreterTextController(new InterpreterText())

const readImgUseCase = new ReadImg(new MicrosoftOcr())
const readImgController = new ReadImgController(readImgUseCase)

export { interpreterTextController, readImgController }
