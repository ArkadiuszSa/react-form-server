"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const application_1 = require("../models/application");
const happening_1 = require("../models/happening");
const Application = mongoose.model("Application", application_1.ApplicationSchema);
const Happening = mongoose.model("Happening", happening_1.HappeningSchema);
class ApplicationController {
    getAllApplications(req, res) {
        Application.find({}).then(applicationsList => {
            res.send(applicationsList);
        });
    }
    getApplicationById(req, res) {
        Application.findById({ _id: req.params.id }).then(happeningApplication => {
            res.send(happeningApplication);
        });
    }
    addNewApplication(req, res) {
        let isApplicationNewPromise = Application.findOne({
            $and: [{ email: req.body.email }, { happeningId: req.body.happeningId }]
        });
        let isHappeningExistPromise = Happening.findById({
            _id: req.body.happeningId
        });
        Promise.all([isApplicationNewPromise, isHappeningExistPromise]).then(([application, happening]) => {
            let errors = [];
            if (happening === null) {
                errors.push("Happening not founded");
            }
            if (application !== null) {
                errors.push("This email is already signed up for this event");
            }
            if (errors.length === 0) {
                let newHappening = new Application(req.body);
                newHappening.save((err, application) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(application);
                });
            }
            else {
                return res.status(400).json({ errors: errors });
            }
        });
    }
    updateApplication(req, res) {
        Application.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, application) => {
            if (err) {
                res.send(err);
            }
            res.json(application);
        });
    }
    deleteApplication(req, res) {
        Application.remove({ _id: req.params.id }, application => {
            res.json({ message: "Successfully deleted application!" });
        });
    }
}
exports.ApplicationController = ApplicationController;
//# sourceMappingURL=application.js.map