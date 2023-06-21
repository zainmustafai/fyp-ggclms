import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Teacher from "../models/teacher.model.js";

const teacherAuthMiddleware = async (req, res, next) => {
  const MY_JWT_SECRET_KEY = process.env.JWT_PRIVATE_KEY;
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedUser = jwt.verify(token, MY_JWT_SECRET_KEY);
      if (decodedUser.role === "Teacher") {
        console.log(decodedUser);
        req.user = decodedUser; // Store the decodedUser user information if needed
        req.teacher = await Teacher.findbyUserId(decodedUser._id);
        next(); // Proceed to the next middleware or route handler
      } else {
        return res.status(401).json({ error: "Invalid Token: Unauthorized" });
      }
    } catch (error) {
      return res.status(401).json({ error: "Exception Caught: Unauthorized" });
    }
  } else {
    return res.status(401).json({ error: "No Token: Unauthorized" });
  }
};

export default teacherAuthMiddleware;
