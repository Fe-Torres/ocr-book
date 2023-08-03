import { ReadImgController } from "../../../infra/api/controllers/readImgController/readImgController";
import { MicrosoftOcr } from "../../../infra/ocr/implementation/microsoft-ocr/microsoftOcr";
import { ReadImgUseCase } from "../../../useCases/ReadImgUseCase/readImgUseCase";

export const makeReadImgController = (): ReadImgController => {
  const microsoftOcr = new MicrosoftOcr();
  const readImgUseCase = new ReadImgUseCase(microsoftOcr);
  const readImgController = new ReadImgController(readImgUseCase);
  return readImgController;
};
