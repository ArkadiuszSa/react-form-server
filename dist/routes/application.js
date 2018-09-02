"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const express_1 = require("express");
const application_1 = require("../models/application");
const check_1 = require("express-validator/check");
const application_2 = require("../controllers/application");
const router = express_1.Router();
const application = mongoose.model("Application", application_1.ApplicationSchema);
let applicationController = new application_2.ApplicationController();
router.get("/applications", applicationController.getAllApplications);
router.get("/application/:id", applicationController.getApplicationById);
router.post("/application", [
    check_1.check("happeningId", "happeningId is not valid mongo id").isMongoId(),
    check_1.check("happeningId", "happeningId is required")
        .not()
        .isEmpty(),
    check_1.check("firstName", "firstName is required")
        .not()
        .isEmpty(),
    check_1.check("lastName", "lastName is required")
        .not()
        .isEmpty(),
    check_1.check("email", "email is required")
        .not()
        .isEmpty(),
    check_1.check("date", "date is required")
        .not()
        .isEmpty(),
    check_1.check("email", "email must be in email format, e.g. some@some.com").isEmail(),
    check_1.check("date", "date must be in ISO8601 format, e.g. 2016-05-18T16:00:00Z").isISO8601()
], (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, applicationController.addNewApplication);
router.put("/application/:id", [
    check_1.check("id", "id is not valid mongo id").isMongoId(),
    check_1.check("happeningId", "happeningId is not valid mongo id").isMongoId(),
    check_1.check("happeningId", "happeningId is required")
        .not()
        .isEmpty(),
    check_1.check("firstName", "firstName is required")
        .not()
        .isEmpty(),
    check_1.check("lastName", "lastName is required")
        .not()
        .isEmpty(),
    check_1.check("email", "email is required")
        .not()
        .isEmpty(),
    check_1.check("date", "date is required")
        .not()
        .isEmpty(),
    check_1.check("email", "email must be in email format, e.g. some@some.com").isEmail(),
    check_1.check("date", "date must be in ISO8601 format, e.g. 2016-05-18T16:00:00Z").isISO8601()
], (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, applicationController.updateApplication);
router.delete("/application/:id", [check_1.check("id", "id is not valid mongo id").isMongoId()], applicationController.deleteApplication);
exports.ApplicationRoute = router;
//# sourceMappingURL=application.js.map