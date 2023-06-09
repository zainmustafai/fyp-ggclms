import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const userLogin = async (req, res) => {
  console.log("user Login Route Reached")
  try {
    const { email, password } = req.body;
    // Find the user by username
    const user = await User.findUserByCredentials(email, password);
    // If the user does not exist or the password is incorrect, return an error
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Generate a JWT
    const token = user.generateAuthToken(); // Method defined on/in Model class.
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User Log out
export const userLogout= async (req,res)=>{
  console.log("...... ......... .. .. ... ........ ....");
  console.log(req.user);
  
  try{
    
  }catch(error){
    
  }

};

// Create a new user
export const createNewUser = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    const user = await User.create({ email, username, password, role });
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  console.log("GET ALL USERS ROUTE REACHED! THIS MEANS ADMIN IS AUTHENTICATED ");
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("User not found");
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Update a user by ID
export const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) throw new Error("User not found");
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new Error("User not found");
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

