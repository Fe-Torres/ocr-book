import { Request, Response } from 'express'
import { IReadImg } from '../../../../useCases/readImgUseCase/readImgDTO'
import { ReadImg } from '../../../../useCases/readImgUseCase/readImgUseCase'

export class ReadImgController {
  constructor (
    private readImgUseCase: ReadImg
  ) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const img: IReadImg = {
      img: "uepa"
    }
    const image = request.file.path
    console.log(typeof(image))
    try {
      const result = await this.readImgUseCase.execute(image)
      return response.status(200).json({ result })
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
