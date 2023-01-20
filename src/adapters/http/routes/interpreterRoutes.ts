import { Router } from 'express'
import { interpreterTextController, readImgController } from '../controllers'
import uploads from './upload'

const interpreterRoutes = Router()

interpreterRoutes.post('/interpreter', (request, response) => {
  return interpreterTextController.handle(request, response)
})

interpreterRoutes.post('/read-image',uploads.single('img'), (request, response) => {
  return readImgController.handle(request, response)
})

export { interpreterRoutes }
