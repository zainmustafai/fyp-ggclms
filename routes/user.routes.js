import express from 'express'
import {createNewUser, getAllUsers,userLogin, userLogout} from '../controllers/user.controllers.js';
import authentiactionMiddleware from '../middleware/authentication.middleware.js'
const userRouter = express.Router();

userRouter.post('/login',userLogin);
userRouter.post('/logout',userLogout);
userRouter.get('/getAllUsers',authentiactionMiddleware, getAllUsers);
userRouter.post('/createNewUser',createNewUser);
export default userRouter;