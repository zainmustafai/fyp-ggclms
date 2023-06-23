import express from "express";
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  logoutAllDevices,
  userLogin,
  userLogout,
} from "../controllers/user.controllers.js";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import adminAuthMiddleware from "../middleware/admin.middleware.js";

const userRouter = express.Router();
userRouter.post("/login", userLogin);
userRouter.post("/logout", userAuthMiddleware, userLogout);
userRouter.get("/", adminAuthMiddleware, getAllUsers);
userRouter.post("/", createNewUser);
userRouter.delete("/:id",adminAuthMiddleware, deleteUserById);
userRouter.post('/logoutall',userAuthMiddleware,logoutAllDevices);
export default userRouter;
