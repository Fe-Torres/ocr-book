import { Request, Response } from 'express';
import { ReadImg } from '../../../../useCases/readImgUseCase/readImgUseCase';
import path from 'path';
import * as fs from 'fs';

export class ReadImgController {
  constructor(private readImgUseCase: ReadImg) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      // const imagePath = request.file.path;
      // const imageBuffer: Buffer = await fs.promises.readFile(
      //   path.join(imagePath)
      // );
      const { imgBase64 } = request.body;
      const imageBuffer = Buffer.from(imgBase64, 'base64');

      const result = await this.readImgUseCase.execute(imageBuffer);

      return response.status(200).json({ result });
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}
