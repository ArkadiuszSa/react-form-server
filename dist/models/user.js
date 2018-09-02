"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});
//# sourceMappingURL=user.js.map