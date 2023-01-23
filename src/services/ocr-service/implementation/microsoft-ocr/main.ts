import { IOcr } from '../../interfaces/ocrInterface';
import { computerVision } from './microsoftOcr';

export class MicrosoftOcr implements IOcr {
  async readImage(image) {
    const result = await computerVision(image);
    return result;
  }
}
