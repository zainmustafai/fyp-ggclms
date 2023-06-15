import express from "express"
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const authenticationMiddleware = (req, res, next) => {
  const MY_JWT_SECRET_KEY = process.env.JWT_PRIVATE_KEY;
  const authHeader = req.header("Authorization");
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    console.log(MY_JWT_SECRET_KEY);
    // Verify the token and check if it represents an admin user
    // Add your token verification and admin check logic here
    try {
      // Assuming you're using JWT for authentication
      const decodedUser = jwt.verify(token, MY_JWT_SECRET_KEY);
      if (decodedUser.role === 'Teacher') {
        // Token is valid and represents an admin user
        req.user = decodedUser; // Store the decodedUser user information if needed
        next(); // Proceed to the next middleware or route handler
      } else {
        // Token is valid but doesn't represent an admin user
        return res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      // Token verification failed
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    // No token provided in the authorization header
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authenticationMiddleware;
