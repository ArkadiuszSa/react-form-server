import * as mongoose from 'mongoose';
import { Router, Request, Response } from 'express';

import { HappeningSchema } from '../models/happening';
import { check, validationResult } from 'express-validator/check';
import { HappeningController } from '../controllers/happening';

const router: Router = Router();

const happeningApplication = mongoose.model('Happening', HappeningSchema);
let happeningApplicationController: HappeningController = new HappeningController();

router.get('/happenings', happeningApplicationController.getAllHappenings);

router.get('/happening/:id', happeningApplicationController.getHappeningById)

router.post('/happening', [
  check('title', 'title is required').not().isEmpty(),
  check('description', 'description is required').not().isEmpty(),
  check('days', 'days is required').not().isEmpty(),
  check('price', 'price is required').not().isEmpty()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
}, happeningApplicationController.addNewHappening)

router.put('/happening/:id', [
  check('title', 'title is required').not().isEmpty(),
  check('description', 'description is required').not().isEmpty(),
  check('days', 'days is required').not().isEmpty(),
  check('price', 'price is required').not().isEmpty()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
}, happeningApplicationController.updateHappening)

router.delete('/happening/:id', happeningApplicationController.deleteHappening)

export const HappeningRoute: Router = router;

