import express from "express";
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  userLogin,
  userLogout,
} from "../controllers/user.controllers.js";
import authentiactionMiddleware from "../middleware/authentication.middleware.js";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import adminAuthMiddleware from "../middleware/admin.middleware.js";

const userRouter = express.Router();
userRouter.post("/login", userLogin);
userRouter.post("/logout", userAuthMiddleware, userLogout);
userRouter.get("/", authentiactionMiddleware, getAllUsers);
userRouter.post("/", createNewUser);
userRouter.delete("/:id",adminAuthMiddleware, deleteUserById);
export default userRouter;
