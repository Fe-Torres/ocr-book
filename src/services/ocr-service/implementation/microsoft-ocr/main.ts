import { IOcr } from '../../interfaces/ocrInterface';
import { computerVision } from './microsoftOcr';

export class MicrosoftOcr implements IOcr {
  async readImage(imageBuffer: Buffer) {
    try {
      const result = await computerVision(imageBuffer);
      return result;
    } catch (error) {
      throw new Error(error.body.error.message);
    }
  }
}
