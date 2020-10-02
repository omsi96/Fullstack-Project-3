// في هذا الملف ، قم بإعداد وحدة المستخدم (المدرس) الخاصة بك | in this file, set up your user module

// 1. قم باستيراد مكتبة moongoose | import the mongoose library

// 2. قم بتحديد مخطط المدرس | start defining your user schema

// 3. إنشاء نموذج المدرس | create  the user model

// تخزين كلمة السر بعد عمل الهاش

// 4. تصدير الوحدة | export the module

// في هذا الملف ، قم بإعداد وحدة المستخدم (الطالب) الخاصة بك | in this file, set up your user module
// 1. قم باستيراد مكتبة moongoose | import the mongoose library
// 2. قم بتحديد مخطط الطالب | start defining your user schema
// 3. إنشاء نموذج الطالب | create  the user model
// 4. تصدير الوحدة | export the module

import pkg from "mongoose";
import { hashPassword } from "../helper.js";
import shortid from "shortid";

const { Schema, model } = pkg;

// Creating the Scheme
const ObjectId = Schema.ObjectId;

const TeacherScheme = new Schema({
  name: String,
  password: String,
  email: { type: String, unique: true },
  city: String,
  birthday: String,
  salt: String,
});

TeacherScheme.pre("save", function (next) {
  // generate salt
  let salt = shortid.generate();
  this.salt = salt;
  if (this.password) {
    this.password = hashPassword(this.password, salt);
    console.log("🔒Password!", this.password);
  }
  next();
});

// Creating the model
const TeacherModel = model("Teacher", TeacherScheme);

TeacherModel.createIndexes();
export default TeacherModel;
