"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class DatabaseConfig {
    constructor() {
        if (process.env.NODE_ENV === "production" ||
            process.env.NODE_ENV === "dev") {
            this.mongoSetup();
        }
    }
    mongoSetup() {
        if (process.env.NODE_ENV === "production") {
            this.mongoUrl = process.env.CONNECTION_STRING_PROD;
        }
        else if (process.env.NODE_ENV === "dev") {
            this.mongoUrl = process.env.CONNECTION_STRING_DEV;
        }
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
exports.default = DatabaseConfig;
//# sourceMappingURL=database-config.js.map