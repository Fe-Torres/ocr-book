import { Router } from 'express';
import { makeReadImgController } from '../../../main/factories/readImg';
import { makeRunCodeTextController } from '../../../main/factories/runCode';

const interpreterRoutes = Router();

interpreterRoutes.post('/run-code', (request, response) => {
  // Deixar o controller agnostico
  // Controller só vai receber o body e retornar o status e dados
  return makeRunCodeTextController().handle(request, response);
});

interpreterRoutes.post('/read-image', (request, response) => {
  return makeReadImgController().handle(request, response);
});

export { interpreterRoutes };
