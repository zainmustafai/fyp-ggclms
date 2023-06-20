import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";

const postAuthMiddleware = async (req, res, next) => {
  const MY_JWT_SECRET_KEY = process.env.JWT_PRIVATE_KEY;
  const authHeader = req.header("Authorization");
  const courseId = req.params.id;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedUser = jwt.verify(token, MY_JWT_SECRET_KEY);
      const userID = decodedUser._id;
      console.log(courseId);
      const user = await User.findById(userID).populate(); // the user who requested to post.
      // console.log(user);
      // JUST IN CASE ADMIN POSTS IN BOARD.
      if (user.role === "Admin") {
        req.user = user;
        req.courseId = courseId;
        next();
      } //
      else if (user.role === "Student") {
        req.user = user;
        const student = await Student.findByUserId(user_id);
        const isEnrolled = student.isEnrolledInCourse(courseId); // check if enrolled.
        console.log(student);
        console.log(isEnrolled);
      } else if (user.role === "Teacher") {
        const teacher = await Teacher.findByUserId(user._id);
        const isRegistered = await teacher.hasCourse(courseId);
        console.log(isRegistered);
        // IF USER WHO POSTED IS REGISTERED.
        if (isRegistered) {
          req.user = user;
          req.isRegistered = true;
          req.courseId = courseId;
          next();
        } else {
          return res.status(401).json({ error: "USER NOT REGISTERED TO POST IN THIS DISCUSSION BOARD." });
        }
      }
      next();
    } catch (error) {
      // Token verification failed
      return res.status(401).json({ error: "Exception Caught: Unauthorized" });
    }
  } else {
    // No token provided in the authorization header
    return res.status(401).json({ error: "Unauthorized" });
  }
};
export default postAuthMiddleware;
