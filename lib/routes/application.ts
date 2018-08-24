import * as mongoose from 'mongoose';
import { Router, Request, Response } from 'express';

import { ApplicationSchema } from '../models/application';
import { check, validationResult } from 'express-validator/check';
import { ApplicationController } from '../controllers/application';

const router: Router = Router();

const application = mongoose.model('Application', ApplicationSchema);
let applicationController: ApplicationController = new ApplicationController();

router.get('/applications', applicationController.getAllApplications);

router.get('/application/:id', applicationController.getApplicationById)

router.post('/application', [
  check('happeningId', 'happeningId is not valid mongo id').isMongoId(),
  check('happeningId', 'happeningId is required').not().isEmpty(),
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
}, applicationController.addNewApplication)

router.put('/application/:id', [
  check('id', 'id is not valid mongo id').isMongoId(),
  check('happeningId', 'happeningId is not valid mongo id').isMongoId(),
  check('happeningId', 'happeningId is required').not().isEmpty(),
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
}, applicationController.updateApplication)

router.delete('/application/:id',[
  check('id', 'id is not valid mongo id').isMongoId(),
],
 applicationController.deleteApplication)

export const ApplicationRoute: Router = router;

