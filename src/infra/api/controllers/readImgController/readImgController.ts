import { Request, Response } from 'express';
import { ReadImgUseCase } from '../../../../useCases/readImgUseCase/readImgUseCase';

export class ReadImgController {
  constructor(private readImgUseCase: ReadImgUseCase) {}

  // TODO pós MVP - Deixar o controller agnóstico
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { imgBase64 } = request.body;
      const result = await this.readImgUseCase.execute(imgBase64);

      return response.status(200).json({ result });
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}
