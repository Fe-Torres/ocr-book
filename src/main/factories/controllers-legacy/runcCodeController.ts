import { RunCodeTextController } from "../../../infra/api/controllers/runCodeTextController/runCodeTextController";
import { ChatGptService } from "../../../infra/chatGptService/chatGpt";
import { FileManager } from "../../../useCases/RunCodeTextUseCase/helpers/fileManager";
import { MapperText } from "../../../useCases/RunCodeTextUseCase/helpers/mapperText";
import { RunCodeTextUseCase } from "../../../useCases/RunCodeTextUseCase/runCodeTextUseCase";

export const makeRunCodeTextController = (): RunCodeTextController => {
  const mapperText = new MapperText();
  const fileManager = new FileManager();
  const chatGptService = new ChatGptService();
  const runCodeTextUseCase = new RunCodeTextUseCase(
    mapperText,
    fileManager,
    chatGptService
  );
  const runCodeTextController = new RunCodeTextController(runCodeTextUseCase);
  return runCodeTextController;
};
