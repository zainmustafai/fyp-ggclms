import express, { Router } from 'express';
import {createNewCourse} from '../controllers/course.controllers.js';
import adminAuthMiddleware from '../middleware/admin.middleware.js';
import { createNewTeacher, getAllTeachers } from '../controllers/teacher.controllers.js';
const teacherRouter= express.Router();
teacherRouter.post('/courses',createNewCourse);
teacherRouter.get('/',getAllTeachers); //Should be accessible to Only Admins.
teacherRouter.post('/',createNewTeacher); //Should be accessible to Only Admins.
export default teacherRouter;