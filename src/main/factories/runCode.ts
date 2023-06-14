import { RunCodeTextController } from '../../infra/api/controllers/runCodeTextController/runCodeTextController';
import { RunCodeTextUseCase } from '../../useCases/RunCodeTextUseCase/runCodeTextUseCase';

export const makeRunCodeTextController = (): RunCodeTextController => {
  const runCodeTextController = new RunCodeTextController(
    new RunCodeTextUseCase()
  );
  return runCodeTextController;
};
