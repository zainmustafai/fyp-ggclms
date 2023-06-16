import express from 'express'
import {createNewUser, getAllUsers,userLogin, userLogout} from '../controllers/user.controllers.js';
import authentiactionMiddleware from '../middleware/authentication.middleware.js'
import userAuthMiddleware from '../middleware/userAuthMiddleware.js';
const userRouter = express.Router();


userRouter.post('/login',userLogin);
userRouter.post('/logout',userAuthMiddleware,userLogout);
userRouter.get('/',authentiactionMiddleware, getAllUsers);
userRouter.post('/',createNewUser);
export default userRouter;