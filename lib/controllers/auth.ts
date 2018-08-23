import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user';
import { Request, Response } from 'express';
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const User = mongoose.model('User', UserSchema);

export interface User {
  _id: string,
  email: string,
  password: string
}

export class AuthController {

  public register(req: Request, res: Response) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
      email : req.body.email,
      password : hashedPassword,
    },
     (err, user) => {
      if (err) return res.status(500).send("There was a problem registering the user.")
      
      let role;
      if(req.body.email='admin@admin.com') {
        role='admin'
      } else {
        role='user'
      }
      var token = jwt.sign({
        id: user._id,
        role:role
       }, process.env.SECRET_PASSWORD, {
       expiresIn: 3600
     });
     res.status(200).send({ auth: true, token: token, id: user._id, role:role});
    }); 
  }

  public login(req: Request, res: Response) {

    User.findOne({ email: req.body.email }, (err, user:User) => {

      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      let role;
      if(req.body.email='admin@admin.com') {
        role='admin'
      } else {
        role='user'
      }

      var token = jwt.sign({
         id: user._id,
         role:role,
        }, process.env.SECRET_PASSWORD, {
        expiresIn: 3600
      });
      res.status(200).send({ auth: true, token: token, id: user._id, role:role});
    });


  }

}



