import { IOcr } from '../../infra/ocr/interfaces/ocrInterface';

export class ReadImg {
  constructor(private ocr: IOcr) { }

  async execute(imageBuffer: Buffer): Promise<string> {
    const text = await this.ocr.readImage(imageBuffer);
    return text;
  }
}
