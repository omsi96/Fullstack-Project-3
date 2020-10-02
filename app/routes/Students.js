import StudentModel from "../models/Student.js";
import pkg from "mongoose";
import Joi from "joi";
import { authorize } from "../helper.js";

var ObjectId = pkg.Types.ObjectId;

const setupRoutesForStudents = (app) => {
  const path = (path) => "/student/" + path;

  // 📄 NEW
  app.post(path("new"), (req, res) => {
    const { name, birthday, city, email } = req.body;
    let schemeValidator = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      birthday: Joi.string(),
      city: Joi.string(),
    });

    let validatedUser = schemeValidator.validate(req.body);
    if (validatedUser.error) {
      console.log("***** Error found!");
      res.status(400).send(validatedUser.error.details[0].message);
      return;
    }

    let user = StudentModel(validatedUser.value);
    console.log("§§§§^^^^^^^^^^ user: ", user);
    user
      .save()
      .then(() => {
        console.log("User has been saved successfully!");
        console.log(user.name, user.email);
        res.status(201).send(user);
      })
      .catch((error) => {
        console.log("Couldn't save student :( ");
        console.log(user.name, user.email);
        res.status(403).send(`Couldn't create student with error ${error}`);
      });
  });

  // ✍🏻 EDIT
  app.patch(path("edit"), async (req, res) => {
    try {
      await authorize(req, res);
      // Search for user in db
      let { email, name, birthday, city } = req.body;
      let user = await StudentModel.findOne({ email: email });
      if (!user) {
        res.status(404).send("Student not found!");
        return;
      }
      // ✅ Student found
      if (name) {
        user.name = name;
      }
      if (birthday) {
        user.birthday = birthday;
      }
      if (city) {
        user.city = city;
      }
      await user.save();
      res.send({ message: "student has been updated successfully!", user });
    } catch (error) {
      res.status(401).send("Unauthorized!");
    }
  });

  // 🗑 DELETE
  app.delete(path("delete"), async (req, res) => {
    try {
      await authorize(req, res);
      // Search for user in db
      let { email } = req.body;
      let user = await StudentModel.remove({ email: email }, (err) => {
        if (err) {
          res.status(404).send("Student not found!");
          return;
        } else {
          // ✅ Deleted successfully
          res.send({ message: "student has been deleted successfully!" });
        }
      });
    } catch (error) {
      res.status(401).send("Unauthorized!");
    }
  });
  // 👨🏻‍🎓 👨🏻‍🎓 👨🏻‍🎓 👨🏻‍🎓 👨🏻‍🎓 👨🏻‍🎓 👨🏻‍🎓 👨🏻‍🎓  Get all students
  app.get(path("all"), async (req, res) => {
    try {
      let id = req.params.id;
      await authorize(req, res);
      console.log("AUTHORIZED!!!!");
      let students = await StudentModel.find({});
      // ✅ Found student
      console.log("Students are found!", students);
      res.status(200).send(students);
      return;
    } catch (error) {
      res.status(401).send(error);
    }
  });
  // 👨🏻‍🎓 Get a single student by id
  app.get(path(":id"), async (req, res) => {
    try {
      let id = req.params.id;
      await authorize(req, res);
      console.log("AUTHORIZED!!!!");
      let student = await StudentModel.findById(id);
      if (!student) {
        res.status(404).send("Student not found!");
        return;
      }
      // ✅ Found student
      console.log("Student is found!", student);
      res.status(200).send(student);
      return;
    } catch (error) {
      res.status(401).send(error);
    }
  });
};

export default setupRoutesForStudents;
