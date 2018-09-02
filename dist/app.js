"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const application_1 = require("./routes/application");
const happening_1 = require("./routes/happening");
const auth_1 = require("./routes/auth");
const route_guard_1 = require("./route-guard");
const database_config_1 = require("./database-config");
class App {
    constructor() {
        this.app = express();
        this.envConfig();
        new database_config_1.default();
        this.config();
        this.routesConfig();
    }
    envConfig() {
        dotenv.config();
    }
    config() {
        if (process.env.NODE_ENV !== "prod") {
            this.app.use(cors());
        }
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static("public"));
        this.app.use(route_guard_1.default);
    }
    routesConfig() {
        this.app.use("/api", application_1.ApplicationRoute);
        this.app.use("/api", happening_1.HappeningRoute);
        this.app.use("/api", auth_1.AuthRoute);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map