import * as mongoose from 'mongoose';
import { HappeningSchema } from '../models/happening';
import { check, validationResult } from 'express-validator/check';
import { HappeningController } from '../controllers/happening';

const happening = mongoose.model('Happening', HappeningSchema);

export class Routes {

  public happeningController: HappeningController = new HappeningController();

  public routes(app): void {

    app.route('/happenings')
      .get(this.happeningController.getAllHappenings)

    app.route('/happening')
      .post([
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
      }, this.happeningController.addNewHappening)

    app.route('/happening/:id')
      .get(this.happeningController.getHappeningById)

      .put([
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
      }, this.happeningController.updateHappening)

      .delete(this.happeningController.deleteHappening);
  }
}


