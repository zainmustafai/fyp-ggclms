import express from "express";
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  logoutAllDevices,
  updateProfilePictureById,
  userLogin,
  userLogout,
} from "../controllers/user.controllers.js";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import adminAuthMiddleware from "../middleware/admin.middleware.js";
import multer from "multer";
const upload = multer({ dest: 'userprofile/' });
const userRouter = express.Router();
userRouter.post("/login", userLogin);
userRouter.post("/logout", userAuthMiddleware, userLogout);
userRouter.get("/", adminAuthMiddleware, getAllUsers);
userRouter.get('/:id',userAuthMiddleware,getUserById);
userRouter.post("/", createNewUser);
userRouter.delete("/:id",adminAuthMiddleware, deleteUserById);
userRouter.post('/logoutall/:id',userAuthMiddleware,logoutAllDevices);
// PUT
userRouter.put('/:id/profileimage',upload.single('profileImage'),updateProfilePictureById);

export default userRouter;
//upload.single('profileImage')