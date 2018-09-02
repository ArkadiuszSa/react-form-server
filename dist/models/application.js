"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ApplicationSchema = new Schema({
    happeningId: {
        type: String
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String
    },
    date: {
        type: Date
    }
});
//# sourceMappingURL=application.js.map