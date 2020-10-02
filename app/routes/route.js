// في هذا الملف ، قم بإعداد طرق التطبيق الخاصة بك | in this file, set up your application routes

// 1. استيراد وحدةالمدرس | import the teacher module

// 2. استيراد وحدة الطالب | import the student module

// 3. تسجيل مدرس جديد و تخزين بياناته | new teacher sign up

// 4. تسجيل دخول مدرس و ارجاع التوكن | teacher login and response with jwt token

// 5. إعداد طرق مختلفة | setup the different routes (get, post, put, delete)

import setupRoutesForUsers from "./Auth.js";
import setupRoutesForStudents from "./Students.js";

const setupRoutes = (app) => {
  // Home
  app.get("/", (req, res) => {
    res.send("Home Page");
  });
  setupRoutesForUsers(app);
  setupRoutesForStudents(app);
  // The rest
  app.get("*", (req, res) => {
    res.send("This page doesn't exist!");
  });
};

// 3. تصدير الوحدة | export the module
export default setupRoutes;
