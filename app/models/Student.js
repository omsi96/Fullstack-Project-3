// في هذا الملف ، قم بإعداد وحدة المستخدم (الطالب) الخاصة بك | in this file, set up your user module
// 1. قم باستيراد مكتبة moongoose | import the mongoose library
// 2. قم بتحديد مخطط الطالب | start defining your user schema
// 3. إنشاء نموذج الطالب | create  the user model
// 4. تصدير الوحدة | export the module

import pkg from "mongoose";
const { Schema, model } = pkg;

// Creating the Scheme
const ObjectId = Schema.ObjectId;

const StudentScheme = new Schema({
  name: String,
  email: { type: String, unique: true },
  city: String,
  birthday: String,
});

// Creating the model
const StudentModel = model("Student", StudentScheme);

StudentModel.createIndexes();
export default StudentModel;
