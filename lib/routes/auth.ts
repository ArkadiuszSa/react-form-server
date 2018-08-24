import * as mongoose from 'mongoose';
import { Router, Request, Response } from 'express';

import { check, validationResult } from 'express-validator/check';
import { AuthController } from '../controllers/auth';
import { UserSchema } from '../models/user';

const router: Router = Router();

const User = mongoose.model('User', UserSchema);
let authController:AuthController = new AuthController();

router.post('/login', [
  check('email', 'email is required').not().isEmpty(),
  check('password', 'password is required').not().isEmpty(),
  check('email', 'email must be in email format, e.g. some@some.com').isEmail(),

], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
},authController.login)

router.post('/register', [
  check('email', 'email is required').not().isEmpty(),
  check('email', 'email must be in email format, e.g. some@some.com').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
},authController.register)


export const AuthRoute: Router = router;

