import express, { Router } from 'express';
import {createNewCourse} from '../controllers/course.controllers.js';
import adminAuthMiddleware from '../middleware/admin.middleware.js';
import { createNewTeacher, getAllTeachers, getTeachersAllCourses } from '../controllers/teacher.controllers.js';
import teacherAuthMiddleware from '../middleware/teacherAuthentication.middleware.js';
const teacherRouter= express.Router();

teacherRouter.get('/',getAllTeachers); //Should be accessible to Only Admins.
teacherRouter.get('/:id/',adminAuthMiddleware,getTeacherById);
teacherRouter.get('/:id/',adminAuthMiddleware,getTeacherById);
teacherRouter.post('/courses',createNewCourse);
teacherRouter.get('/courses',teacherAuthMiddleware, getTeachersAllCourses  );
teacherRouter.post('/',adminAuthMiddleware,createNewTeacher); //Should be accessible to Only Admins.
export default teacherRouter;