import express from 'express'
import cors from 'cors'
import { interpreterRoutes } from '../routes/interpreterRoutes'

export class App {
  public server: express.Application

  constructor () {
    this.server = express()
    this.middleware()
    this.router()
  }

  private corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
  }

  private middleware () {
    this.server.use(express.json())
  }

  private router () {
    this.server.use(cors(this.corsOptions))
    this.server.use(interpreterRoutes)
  }
}
