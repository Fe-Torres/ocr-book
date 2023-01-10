import express from 'express'
import { interpreterRoutes } from '../routes/interpreterRoutes'

export class App {
  public server: express.Application

  constructor () {
    this.server = express()
    this.middleware()
    this.router()
  }

  private middleware () {
    this.server.use(express.json())
  }

  private router () {
    this.server.use(interpreterRoutes)
  }
}
