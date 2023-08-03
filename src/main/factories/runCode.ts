import { RunCodeTextUseCase } from "../../useCases/RunCodeTextUseCase/runCodeTextUseCase";

export const makeRunCodeUsecase = (): RunCodeTextUseCase => {
  return new RunCodeTextUseCase();
};
