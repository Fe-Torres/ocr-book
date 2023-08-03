import { IOcr } from "../../infra/ocr/interfaces/ocrInterface";
import { Logger } from "../../main/logs/Loger";
import { ImgModel } from "../../model/ImgModel";

export class ReadImgUseCase {
  constructor(private ocr: IOcr) {
    this.ocr = ocr;
  }

  async execute(imageBase64: string): Promise<string> {
    Logger.initialProcessMessage("ReadImgUseCase");
    const imgModel = new ImgModel(imageBase64);

    if (!imgModel.isValidImageFormat()) {
      throw new Error("Invalid image format.");
    }

    const text = await this.ocr.readImage(imgModel.getImageBuffer());
    Logger.endProcessMessage("ReadImgUseCase");

    return text;
  }
}
