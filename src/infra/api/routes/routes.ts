import { Router } from "express";
import { makeReadImgController } from "../../../main/factories/controllers-legacy/readImgController";
import { makeRunCodeTextController } from "../../../main/factories/controllers-legacy/runcCodeController";

const routes = Router();

routes.post("/run-code", (request, response) => {
  // Deixar o controller agnostico
  // Controller só vai receber o body e retornar o status e dados
  return makeRunCodeTextController().handle(request, response);
});

routes.post("/read-image", (request, response) => {
  return makeReadImgController().handle(request, response);
});

export { routes };
