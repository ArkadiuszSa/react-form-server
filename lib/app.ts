import * as express from "express";
import * as bodyParser from "body-parser";
import * as  interceptor from 'express-interceptor';
import * as  jwt from 'jsonwebtoken';

import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { ApplicationRoute } from './routes/application'
import { HappeningRoute } from './routes/happening'
import { AuthRoute } from './routes/auth'

class App {

  public app: express.Application;
  public mongoUrl: string;
  constructor() {
    this.app = express();
    this.envConfig();
    this.config();
    this.routesConfig();
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
    this.app.use(this.interceptor());

  }

  private routesConfig() {

    this.app.use('/api', ApplicationRoute)
    this.app.use('/api', HappeningRoute)
    this.app.use('/api', AuthRoute)

  }

  private mongoSetup(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }

  private checkGurdedRoute() {
    return ((req: express.Request, res: express.Response, next: Function) => {
      var token = req.headers.authorization;
      jwt.verify(token, process.env.SECRET_PASSWORD, ((err, token) => {
        
        if (err) {
          return res.status(400).json({ error: "Invalid JSON token" });
        } else {
          next()
        }
      }));
    })
  }

  private interceptor() {
    return ((req: express.Request, res: express.Response, next: Function) => {
      let protectedRoutes = [
        {
          path: "/api/happening",
          methods: ['POST']
        },
        {
          path: "/api/applications",
          methods: ['GET']
        }
      ]

      let isGuarded=false

      if (req.method === "PUT" || req.method === "DELETE") {
        isGuarded=true;
      }

      for (let route of protectedRoutes) {
        if (req.url === route.path) {
          for (let method of route.methods) {
            if (req.method === method) {
              isGuarded=true;
            }
          }
        }
      }
      if(isGuarded){
        let checkGurdedRoute=this.checkGurdedRoute();
        checkGurdedRoute(req,res,next)
      }
      else{
        next();
      }

    })
  }
}

export default new App().app;