import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as cors from "cors";
import {HappeningApplicationRoute} from './routes/happening-application'
import {HappeningRoute} from './routes/happening'

class App {

  public app: express.Application;
  public mongoUrl: string;
  constructor() {
    this.app = express();
    this.envConfig();
    this.config();
    this.routesConfig();
    
    //this.happeningApplicationRoute.routes(this.app);
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

  private routesConfig() {
    this.app.use('/api', HappeningApplicationRoute)
    this.app.use('/api', HappeningRoute)

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