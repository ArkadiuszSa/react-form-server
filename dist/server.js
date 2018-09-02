"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.default.get("/", (req, res) => res.send("React-Form api is online!"));
app_1.default.listen(process.env.PORT || 4000, function () {
    console.log("now listening for requests");
});
//# sourceMappingURL=server.js.map