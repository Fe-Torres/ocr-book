import { IOcr } from '../../interfaces/ocrInterface'

import {computerVision} from './index'
export class MicrosoftOcr implements IOcr {

    async readImage(image) {
       const result = await computerVision(image);
       return result
    }
}
