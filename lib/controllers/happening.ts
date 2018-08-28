import * as mongoose from "mongoose";
import { HappeningSchema } from "../models/happening";
import { Request, Response } from "express";

const Happening = mongoose.model("Happening", HappeningSchema);

export class HappeningController {
  public getAllHappenings(req: Request, res: Response) {
    Happening.find({}).then(happeningsList => {
      res.send(happeningsList);
    });
  }

  public getHappeningById(req: Request, res: Response) {
    Happening.findById({ _id: req.params.id }).then(happening => {
      res.send(happening);
    });
  }

  public addNewHappening(req: Request, res: Response) {
    let newHappening = new Happening(req.body);
    newHappening.save((err, happening) => {
      if (err) {
        res.send(err);
      }
      res.json(happening);
    });
  }

  public updateHappening(req: Request, res: Response) {
    Happening.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, happening) => {
        if (err) {
          res.send(err);
        }
        res.json(happening);
      }
    );
  }

  public deleteHappening(req: Request, res: Response) {
    Happening.remove({ _id: req.params.id }, happening => {
      res.json({ message: "Successfully deleted happening!" });
    });
  }
}
