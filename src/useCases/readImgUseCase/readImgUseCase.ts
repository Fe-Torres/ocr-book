import { IOcr } from '../../services/ocr-service/interfaces/ocrInterface'

export class ReadImg {
  constructor (
    private ocr: IOcr
    ) {}
  async execute (image_buffer) {
    try {
      const response = await this.ocr.readImage(image_buffer)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}

export function teste_find_dead_code(){
  console.log("uepas")
}