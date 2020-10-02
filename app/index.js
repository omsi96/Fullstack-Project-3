//  استيراد المكتبات المطلوبة | import the required libraries
//  تأكد من تنزيل الوحدات المطلوبة | make sure to download the required modules
// لا تنسى تحديد وظيفة الخادم | don't forget to define the server function that listens to requests

import Student from "./models/Student.js";
import Teacher from "./models/Teacher.js";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import setupRoutes from "./routes/route.js";

const start = async () => {
  let database = "mongodb://localhost/project-fs-1";
  try {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      // autoIndex: true, //this is the code I added that solved it all
      keepAlive: true,
      poolSize: 10,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    const conn = await mongoose.connect(database, options);
    // ✅ CONNECTION GRANTED
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    setupRoutes(app);
    app.listen(3000);
  } catch (error) {
    // ❌ CONNECTION ERROR
    console.log("Couldn't connect to database with error: ", error);
  }
};

start();
