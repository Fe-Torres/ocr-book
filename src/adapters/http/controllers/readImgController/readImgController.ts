import { Request, Response } from 'express'
import { ReadImg } from '../../../../useCases/readImgUseCase/readImgUseCase'
import path from 'path'
import * as fs from 'fs'


export class ReadImgController {
  constructor(
    private readImgUseCase: ReadImg
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const image_path = request.file.path
    console.log(image_path)
    const image_buffer = await fs.promises.readFile(path.join(image_path));
    try {
      const result = await this.readImgUseCase.execute(image_buffer)
      return response.status(200).json({ result })
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
