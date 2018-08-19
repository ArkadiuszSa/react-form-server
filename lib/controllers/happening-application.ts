import * as mongoose from 'mongoose';
import { HappeningApplicationSchema } from '../models/happening-application';
import { Request, Response } from 'express';

const HappeningApplication = mongoose.model('HappeningApplication', HappeningApplicationSchema);

export class HappeningApplicationController {

  public getAllHappeningsApplications(req: Request, res: Response) {
    HappeningApplication.find({}).then((happeningsList) => {

      res.send(happeningsList);
    })
  }

  public getHappeningApplicationById(req: Request, res: Response) {
    HappeningApplication.findById({ _id: req.params.id }).then(( happeningApplication) => {

      res.send(happeningApplication);
    })
  }

  public addNewHappeningApplication(req: Request, res: Response) {
    let newHappening = new HappeningApplication(req.body);
    newHappening.save((err, happeningApplication) => {
      if (err) {
        res.send(err);
      }
      res.json(happeningApplication);
    });
  }

  public updateHappeningApplication(req: Request, res: Response) {
    HappeningApplication.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, happeningApplication) => {
      if (err) {
        res.send(err);
      }
      res.json(happeningApplication);
    });
  }

  public deleteHappeningApplication(req: Request, res: Response) {
    HappeningApplication.remove({ _id: req.params.id }, ( happeningApplication) => {
      res.json({ message: 'Successfully deleted happening!' });
    });
  }
  
}