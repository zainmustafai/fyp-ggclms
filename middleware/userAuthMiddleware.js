import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const userAuthMiddleware = (req, res, next) => {
  console.log("userAuthMiddleware");
  const MY_JWT_SECRET_KEY = process.env.JWT_PRIVATE_KEY;
  const authHeader = req.header("Authorization");
  console.log(authHeader);
  if (authHeader) {
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
    try {
      const decodedUser = jwt.verify(token, MY_JWT_SECRET_KEY);
      console.log(decodedUser);
      if (decodedUser) {
        console.log("User is authenticated");
        req.token = token;
        req.user = decodedUser; // Store the decoded user information if needed
        next(); // Proceed to the next middleware or route handler
      } else {
        // Token is valid but doesn't represent an admin user
        return res.status(401).json({ error: "Unauthorized" });
      }
    } catch (error) {
      // Token verification failed
      return res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    // No token provided in the authorization header
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default userAuthMiddleware;
