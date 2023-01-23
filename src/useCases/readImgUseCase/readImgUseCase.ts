import { IOcr } from '../../services/ocr-service/interfaces/ocrInterface';

export class ReadImg {
  constructor(private ocr: IOcr) {}
  async execute(imageBuffer: Buffer) {
    try {
      const response = await this.ocr.readImage(imageBuffer);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
