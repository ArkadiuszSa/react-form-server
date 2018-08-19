import * as mongoose from 'mongoose';
import { Router, Request, Response } from 'express';

import { HappeningApplicationSchema } from '../models/happening-application';
import { check, validationResult } from 'express-validator/check';
import { HappeningApplicationController } from '../controllers/happening-application';

const router: Router = Router();

const happeningApplication = mongoose.model('HappeningApplication', HappeningApplicationSchema);
let happeningApplicationController: HappeningApplicationController = new HappeningApplicationController();

router.get('/happening-applications', happeningApplicationController.getAllHappeningsApplications);

router.get('/happening-application/:id', happeningApplicationController.getHappeningApplicationById)

router.post('/happening-application', [
  check('firstName', 'firstName is required').not().isEmpty(),
  check('lastName', 'lastName is required').not().isEmpty(),
  check('email', 'email is required').not().isEmpty(),
  check('date', 'date is required').not().isEmpty(),
  check('email', 'email must be in email format, e.g. some@some.com').isEmail(),
  check('date', 'date must be in ISO8601 format, e.g. 2016-05-18T16:00:00Z').isISO8601()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
}, happeningApplicationController.addNewHappeningApplication)

router.put('/happening-application/:id', [
  check('firstName', 'firstName is required').not().isEmpty(),
  check('lastName', 'lastName is required').not().isEmpty(),
  check('email', 'email is required').not().isEmpty(),
  check('date', 'date is required').not().isEmpty(),
  check('email', 'email must be in email format, e.g. some@some.com').isEmail(),
  check('date', 'date must be in ISO8601 format, e.g. 2016-05-18T16:00:00Z').isISO8601()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
}, happeningApplicationController.updateHappeningApplication)

router.delete('/happening-application/:id', happeningApplicationController.deleteHappeningApplication)

export const HappeningApplicationRoute: Router = router;

