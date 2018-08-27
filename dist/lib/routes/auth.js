"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const express_1 = require("express");
const check_1 = require("express-validator/check");
const auth_1 = require("../controllers/auth");
const user_1 = require("../models/user");
const router = express_1.Router();
const User = mongoose.model('User', user_1.UserSchema);
let authController = new auth_1.AuthController();
router.post('/login', [
    check_1.check('email', 'email is required').not().isEmpty(),
    check_1.check('password', 'password is required').not().isEmpty(),
    check_1.check('email', 'email must be in email format, e.g. some@some.com').isEmail(),
], (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, authController.login);
router.post('/register', [
    check_1.check('email', 'email is required').not().isEmpty(),
    check_1.check('email', 'email must be in email format, e.g. some@some.com').isEmail(),
    check_1.check('password', 'password is required').not().isEmpty(),
], (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}, authController.register);
exports.AuthRoute = router;
//# sourceMappingURL=auth.js.map