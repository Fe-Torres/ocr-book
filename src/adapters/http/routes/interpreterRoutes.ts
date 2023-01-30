import { Router } from 'express';
import { interpreterTextController, readImgController } from '../controllers';

const interpreterRoutes = Router();

interpreterRoutes.post('/interpreter', (request, response) => {
  return interpreterTextController.handle(request, response);
});

interpreterRoutes.post('/read-image', (request, response) => {
  return readImgController.handle(request, response);
});

export { interpreterRoutes };
