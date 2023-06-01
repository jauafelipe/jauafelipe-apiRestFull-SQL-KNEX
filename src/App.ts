import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { routes } from "./routes/routes";
import "./configs/ConfigDataBase";

class AppKnex {
  private app: express.Application;
  public constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.server();
  }
  public middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ credentials: true }));
  }

  public routes() {
    this.app.use(routes);
  }

  public server() {
    this.app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  }
}

new AppKnex();
