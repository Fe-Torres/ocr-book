import { IOcr } from '../../interfaces/ocrInterface';
import { computerVision } from './microsoftOcr';

export class MicrosoftOcr implements IOcr {
  async readImage(imageBuffer: Buffer) {
    const result = await computerVision(imageBuffer);
    return result;
  }
}
