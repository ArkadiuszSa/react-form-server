"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const happening_1 = require("../models/happening");
const Happening = mongoose.model("Happening", happening_1.HappeningSchema);
class HappeningController {
    getAllHappenings(req, res) {
        Happening.find({}).then(happeningsList => {
            res.send(happeningsList);
        });
    }
    getHappeningById(req, res) {
        Happening.findById({ _id: req.params.id })
            .then(happening => {
            res.send(happening);
        })
            .catch(err => {
            res.send({ message: "Cannot find happening" });
        });
    }
    addNewHappening(req, res) {
        let newHappening = new Happening(req.body);
        newHappening.save((err, happening) => {
            if (err) {
                res.send(err);
            }
            res.json(happening);
        });
    }
    updateHappening(req, res) {
        Happening.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, happening) => {
            if (err) {
                res.send(err);
            }
            res.json(happening);
        });
    }
    deleteHappening(req, res) {
        Happening.remove({ _id: req.params.id }, happening => {
            res.json({ message: "Successfully deleted happening!" });
        });
    }
}
exports.HappeningController = HappeningController;
//# sourceMappingURL=happening.js.map