import { Request, Response } from "express";
import { RunCodeTextUseCase } from "../../../../useCases/RunCodeTextUseCase/runCodeTextUseCase";

export class RunCodeTextController {
  constructor(private interpreterTextUsecase: RunCodeTextUseCase) {
    this.interpreterTextUsecase = interpreterTextUsecase;
  }

  // TODO pós MVP - Deixar o controller agnóstico
  async handle(request: Request, response: Response): Promise<Response> {
    const { codeText } = request.body;
    try {
      const result = await this.interpreterTextUsecase.execute(codeText);
      return response.status(200).json({ result });
    } catch (err) {
      let errorMessage: string = err.message?.toString() || "Unexpected error.";
      errorMessage = errorMessage.replace(/.*\.js:/, "Line: ");

      return response.status(400).json({
        message: errorMessage,
      });
    }
  }
}
