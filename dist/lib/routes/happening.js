"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const express_1 = require("express");
const happening_1 = require("../models/happening");
const check_1 = require("express-validator/check");
const happening_2 = require("../controllers/happening");
const router = express_1.Router();
const happening = mongoose.model('Happening', happening_1.HappeningSchema);
let happeningController = new happening_2.HappeningController();
router.get('/happenings', happeningController.getAllHappenings);
router.get('/happening/:id', happeningController.getHappeningById);
router.post('/happening', [
    check_1.check('title', 'title is required').not().isEmpty(),
    check_1.check('description', 'description is required').not().isEmpty(),
    check_1.check('days', 'days is required').not().isEmpty(),
    check_1.check('price', 'price is required').not().isEmpty()
], (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, happeningController.addNewHappening);
router.put('/happening/:id', [
    check_1.check('id', 'id is not a valid mongo id').isMongoId(),
    check_1.check('title', 'title is required').not().isEmpty(),
    check_1.check('description', 'description is required').not().isEmpty(),
    check_1.check('days', 'days is required').not().isEmpty(),
    check_1.check('price', 'price is required').not().isEmpty(),
], (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, happeningController.updateHappening);
router.delete('/happening/:id', happeningController.deleteHappening);
exports.HappeningRoute = router;
//# sourceMappingURL=happening.js.map