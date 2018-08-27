import * as mongoose from "mongoose";
import { Mockgoose } from "mockgoose"

export default class DatabaseConfig {

  private mongoUrl: string;

  constructor() {
    if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'dev') {
      this.mongoSetup();
    }
  }

  private mongoSetup(): void {

    if (process.env.NODE_ENV === 'prod') {
      this.mongoUrl = process.env.CONNECTION_STRING_PROD;
    } else if (process.env.NODE_ENV === 'dev') {
      this.mongoUrl = process.env.CONNECTION_STRING_DEV;
    }

    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });

  }
}

