import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/happening";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as cors from "cors";

class App {

  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string;

  constructor() {
    this.app = express();
    this.envConfig();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private envConfig(): void {
    dotenv.config();
    if (process.env.NODE_ENV === 'test') {
      this.mongoUrl = process.env.CONNECTION_STRING_TEST;
    } else {
      this.mongoUrl = process.env.CONNECTION_STRING_DEV;
    }
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static('public'));
  }

  private mongoSetup(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }
}

export default new App().app;