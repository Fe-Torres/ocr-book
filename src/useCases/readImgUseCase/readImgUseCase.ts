import { IOcr } from '../../infra/ocr/interfaces/ocrInterface';
import { ImgModel } from '../../model/ImgModel';

export class ReadImgUseCase {
  constructor(private ocr: IOcr) {}

  async execute(imageBase64: string): Promise<string> {
    const imgModel = new ImgModel(imageBase64);

    if (!imgModel.isValidImageFormat()) {
      throw new Error('Invalid image format.');
    }

    const text = await this.ocr.readImage(imgModel.getImageBuffer());
    return text;
  }
}
