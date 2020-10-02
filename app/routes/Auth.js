import TeacherModel from "../models/Teacher.js";
import pkg from "mongoose";
import Joi from "joi";
import { hashPassword } from "../helper.js";
import jwt from "jsonwebtoken";

var ObjectId = pkg.Types.ObjectId;

const setupRoutesForUsers = (app) => {
  const authPath = (path) => "/user/" + path;

  // REGISTER
  app.post(authPath("register"), (req, res) => {
    const { name, email, password, birthday, city } = req.body;
    let schemeValidator = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      birthday: Joi.string().required(),
      city: Joi.string().required(),
    });

    let validatedUser = schemeValidator.validate(req.body);
    if (validatedUser.error) {
      console.log("***** Error found!");
      res.status(400).send(validatedUser.error.details[0].message);
      return;
    }

    let user = TeacherModel(validatedUser.value);
    console.log("§§§§^^^^^^^^^^ user: ", user);
    user
      .save()
      .then(() => {
        console.log("User has been saved successfully!");
        console.log(email, password);
        res.status(201).send(user);
      })
      .catch((error) => {
        console.log("Couldn't save user :( ");
        console.log(email, password);
        res.status(403).send(`Couldn't create user with error ${error}`);
      });
  });

  app.post(authPath("login"), async (req, res) => {
    // Search for user in db
    let { email, password } = req.body;
    let user = await TeacherModel.findOne({ email: email });

    console.log("Found user", user);
    if (user) {
      if (hashPassword(password, user.salt) == user.password) {
        const token = jwt.sign({ sub: user._id }, user.salt, {
          expiresIn: 30000,
        });
        // Valid passowrd!
        res.status(200).send({ user, token });
        return;
      }
      res.status(403).send("Invalid password!");
      return;
    }
    res
      .status(403)
      .send("There is no user assosiated in the system with the given data!");
    return;
  });
};

export default setupRoutesForUsers;
