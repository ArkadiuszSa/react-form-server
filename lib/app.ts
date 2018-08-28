import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { ApplicationRoute } from "./routes/application";
import { HappeningRoute } from "./routes/happening";
import { AuthRoute } from "./routes/auth";
import interceptor from "./route-guard";
import DatabaseConfig from "./database-config";
class App {
  public app: express.Application;
  public mongoUrl: string;
  constructor() {
    this.app = express();
    this.envConfig();
    new DatabaseConfig();
    this.config();
    this.routesConfig();
  }

  private envConfig(): void {
    dotenv.config();
  }

  private config(): void {
    if (process.env.NODE_ENV !== "prod") {
      this.app.use(cors());
    }

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static("public"));
    this.app.use(interceptor);
  }

  private routesConfig() {
    this.app.use("/api", ApplicationRoute);
    this.app.use("/api", HappeningRoute);
    this.app.use("/api", AuthRoute);
  }
}

export default new App().app;
