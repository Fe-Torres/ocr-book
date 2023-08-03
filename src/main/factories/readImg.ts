import { MicrosoftOcr } from "../../infra/ocr/implementation/microsoft-ocr/microsoftOcr";
import { ReadImgUseCase } from "../../useCases/ReadImgUseCase/readImgUseCase";

export const makeReadImgUsecase = (): ReadImgUseCase => {
  const microsoftOcr = new MicrosoftOcr();
  const readImgUseCase = new ReadImgUseCase(microsoftOcr);
  return readImgUseCase;
};
