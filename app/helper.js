import crypto from "crypto";
import jwt from "jsonwebtoken";
import TeacherModel from "./models/Teacher.js";
const hashPassword = (password, salt = "secret") => {
  return crypto.Hmac("sha256", salt).update(password).digest("hex");
};

const authorize = async (req, res) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      const token = req.headers.authorization;
      console.log(token);
      if (!token) {
        reject("Unauthorized! there is no token!");
        return;
      }
      // There is token, check in DB

      let decodedToken = jwt.decode(token);

      let userid = decodedToken.sub;
      console.log(decodedToken, userid);
      const user = await TeacherModel.findById(userid);
      if (!user) {
        reject("Unauthorized! didn't find user with given token");
        return;
      }
      await jwt.verify(token, user.salt);
      resolve("Done!");
    } catch (error) {
      reject(`Unauthorized ${error}`);
      return;
    }
  });
  return promise;
};
export { hashPassword, authorize };
