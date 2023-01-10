import { Request, Response, Router } from 'express'
import { AuthMiddleware } from '../../../../../src/adapters/http/routes/middlewares/middleware'

const testRoutes = Router()

testRoutes.get('/test-middleware', AuthMiddleware, (request: Request, response: Response) => {
  response.send({ Message: 'Ok' })
})

export { testRoutes }
