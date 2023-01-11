import { IOcr } from '../../services/ocr-service/interfaces/ocrInterface'
import { IReadImg } from './readImgDTO'

export class ReadImg {
  constructor (
    private ocr: IOcr
    ) {}
  async execute (img) {
    try {
      const response = await this.ocr.readImage(img)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}
