import { Request, Response } from 'express';
import { ICodeText } from '../../../../model/interfaces/codeTextDTO';
import { RunCodeTextUseCase } from '../../../../useCases/RunCodeTextUseCase/runCodeTextUseCase';

export class RunCodeTextController {
  // trocar por uma interface esse UseCase
  constructor(private interpreterTextUsecase: RunCodeTextUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const codeText: ICodeText = request.body;
    try {
      const result = await this.interpreterTextUsecase.execute(codeText);
      return response.status(200).json({ result });
    } catch (err) {
      // Criar classes de tratamentos de erro;
      // Tratar esses erros
      let errorMessage: string = err.message?.toString() || 'Unexpected error.';
      errorMessage = errorMessage.replace(/.*\.js:/, 'Line: ');

      return response.status(400).json({
        message: errorMessage
      });
    }
  }
}
