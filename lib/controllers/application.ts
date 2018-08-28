import * as mongoose from "mongoose";
import { ApplicationSchema } from "../models/application";
import { HappeningSchema } from "../models/happening";

import { Request, Response } from "express";

const Application = mongoose.model("Application", ApplicationSchema);
const Happening = mongoose.model("Happening", HappeningSchema);

export class ApplicationController {
  public getAllApplications(req: Request, res: Response) {
    Application.find({}).then(applicationsList => {
      res.send(applicationsList);
    });
  }

  public getApplicationById(req: Request, res: Response) {
    Application.findById({ _id: req.params.id }).then(happeningApplication => {
      res.send(happeningApplication);
    });
  }

  public addNewApplication(req: Request, res: Response) {
    let isApplicationNewPromise = Application.findOne({
      $and: [{ email: req.body.email }, { happeningId: req.body.happeningId }]
    });

    let isHappeningExistPromise = Happening.findById({
      _id: req.body.happeningId
    });

    Promise.all([isApplicationNewPromise, isHappeningExistPromise]).then(
      ([application, happening]) => {
        let errors = [];

        if (happening === null) {
          errors.push("Happening not founded");
        }

        if (application !== null) {
          errors.push("This email is already signed up for this event");
        }

        if (errors.length === 0) {
          let newHappening = new Application(req.body);
          newHappening.save((err, application) => {
            if (err) {
              res.send(err);
            }
            res.json(application);
          });
        } else {
          return res.status(400).json({ errors: errors });
        }
      }
    );
  }

  public updateApplication(req: Request, res: Response) {
    Application.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, application) => {
        if (err) {
          res.send(err);
        }
        res.json(application);
      }
    );
  }

  public deleteApplication(req: Request, res: Response) {
    Application.remove({ _id: req.params.id }, application => {
      res.json({ message: "Successfully deleted application!" });
    });
  }
}
