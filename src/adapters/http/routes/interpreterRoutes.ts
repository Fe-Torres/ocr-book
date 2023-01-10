import { Router } from 'express'
import { interpreterTextController } from '../../../useCases'

const interpreterRoutes = Router()

interpreterRoutes.post('/interpreter', (request, response) => {
  return interpreterTextController.handle(request, response)
})

export { interpreterRoutes }
