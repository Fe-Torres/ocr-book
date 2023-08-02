import express from "express";
import cors from "cors";
import { routes } from "./routes/routes";

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(express.json({ limit: "50mb" }));
    this.server.use(express.urlencoded({ limit: "50mb", extended: true }));
  }

  private router() {
    this.server.use(cors());
    this.server.use(routes);
  }
}
