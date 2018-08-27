"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.HappeningSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    days: {
        type: [
            String
        ]
    },
    price: {
        type: String
    }
});
//# sourceMappingURL=happening.js.map