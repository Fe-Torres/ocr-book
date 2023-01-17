import { Request, Response } from 'express'
import { IReadImg } from '../../../../useCases/readImgUseCase/readImgDTO'
import { ReadImg } from '../../../../useCases/readImgUseCase/readImgUseCase'
import FileReader from 'filereader'
import path from 'path'
import * as fs from 'fs'


export class ReadImgController {
  constructor(
    private readImgUseCase: ReadImg
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const image_path = request.file.path
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

function encodeImageFileAsURL(file) {
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result)
  }
  reader.readAsDataURL(file);
}