"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("../models/user");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = mongoose.model("User", user_1.UserSchema);
class AuthController {
    register(req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({
            email: req.body.email,
            password: hashedPassword
        }, (err, user) => {
            if (err)
                return res
                    .status(500)
                    .send("There was a problem registering the user.");
            let role;
            if (req.body.email === "admin@admin.com") {
                role = "admin";
            }
            else {
                role = "user";
            }
            var token = jwt.sign({
                id: user._id,
                role: role
            }, process.env.SECRET_PASSWORD, {
                expiresIn: 3600
            });
            res
                .status(200)
                .send({ auth: true, token: token, id: user._id, role: role });
        });
    }
    login(req, res) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err)
                return res.status(500).send("Error on the server.");
            if (!user)
                return res.status(404).send("No user found.");
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid)
                return res.status(401).send({ auth: false, token: null });
            let role;
            if (req.body.email === "admin@admin.com") {
                role = "admin";
            }
            else {
                role = "user";
            }
            var token = jwt.sign({
                id: user._id,
                role: role
            }, process.env.SECRET_PASSWORD, {
                expiresIn: 3600
            });
            res
                .status(200)
                .send({ auth: true, token: token, id: user._id, role: role });
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map