import { ReadImgController } from '../../infra/api/controllers/readImgController/readImgController';
import { MicrosoftOcr } from '../../infra/ocr/implementation/microsoft-ocr/microsoftOcr';
import { ReadImg } from '../../useCases/readImgUseCase/readImgUseCase';

export const makeReadImgController = (): ReadImgController => {
  const microsoftOcr = new MicrosoftOcr();
  const readImgUseCase = new ReadImg(microsoftOcr);
  const readImgController = new ReadImgController(readImgUseCase);
  return readImgController;
};
