import { Request, Response } from 'express';
import { ReadImg } from '../../../../useCases/readImgUseCase/readImgUseCase';
import path from 'path';
import * as fs from 'fs';

export class ReadImgController {
  constructor(private readImgUseCase: ReadImg) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { imgBase64 } = request.body;
      const imagePath = request.file.path;
      let result: string;

      if (imgBase64) {
        result = await this.readImgUseCase.execute(imgBase64);
      } else {
        const imageBuffer: Buffer = await fs.promises.readFile(
          path.join(imagePath)
        );
        result = await this.readImgUseCase.execute(imageBuffer);
      }

      return response.status(200).json({ result });
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}
