import { IOcr } from '../../infra/ocr/interfaces/ocrInterface';

export class ReadImg {
  constructor(private ocr: IOcr) {}
  async execute(imageBuffer: Buffer): Promise<string> {
    try {
      const response = await this.ocr.readImage(imageBuffer);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
