import express from 'express'
import 'dotenv/config'
import { testRoutes } from './routesMock'

export class AppMock {
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
    this.server.use(testRoutes)
  }
}
