import { RunCodeTextController } from "../../../infra/api/controllers/runCodeTextController/runCodeTextController";
import { FileManager } from "../../../useCases/RunCodeTextUseCase/helpers/fileManager";
import { MapperText } from "../../../useCases/RunCodeTextUseCase/helpers/mapperText";
import { RunCodeTextUseCase } from "../../../useCases/RunCodeTextUseCase/runCodeTextUseCase";

export const makeRunCodeTextController = (): RunCodeTextController => {
  const mapperText = new MapperText();
  const fileManager = new FileManager();
  const runCodeTextUseCase = new RunCodeTextUseCase(mapperText, fileManager);
  const runCodeTextController = new RunCodeTextController(runCodeTextUseCase);
  return runCodeTextController;
};
