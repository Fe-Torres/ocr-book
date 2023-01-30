import { Request, Response } from 'express';
import { IInterpreter } from '../../../../useCases/interpreterUseCase/interpreterDTO';
import { InterpreterText } from '../../../../useCases/interpreterUseCase/interpreterUseCase';

export class InterpreterTextController {
  constructor(private interpreterTextUsecase: InterpreterText) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const interpreterRequest: IInterpreter = request.body;
    try {
      const result = await this.interpreterTextUsecase.execute(
        interpreterRequest
      );
      return response.status(200).json({ result });
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}
