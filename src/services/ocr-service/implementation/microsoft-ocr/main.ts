import { IOcr } from '../../interfaces/ocrInterface'

export class MicrosoftOcr implements IOcr {

    async readImage(image) {
        const text = "Papinha gay"

        return text

    }
}
