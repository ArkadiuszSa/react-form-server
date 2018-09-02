import * as mongoose from "mongoose";

export default class DatabaseConfig {
  private mongoUrl: string;

  constructor() {
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "dev"
    ) {
      this.mongoSetup();
    }
  }

  private mongoSetup(): void {
    if (process.env.NODE_ENV === "production") {
      this.mongoUrl = process.env.CONNECTION_STRING_PROD;
    } else if (process.env.NODE_ENV === "dev") {
      this.mongoUrl = process.env.CONNECTION_STRING_DEV;
    }

    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(
      this.mongoUrl,
      { useNewUrlParser: true }
    );
  }
}
