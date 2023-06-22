import express, { Router } from 'express';
import {createNewCourse, getCoursesByTeacherId} from '../controllers/course.controllers.js';
import adminAuthMiddleware from '../middleware/admin.middleware.js';
import { createNewTeacher, getAllTeachers, getTeachersAllCourses,getTeacherById } from '../controllers/teacher.controllers.js';
import teacherAuthMiddleware from '../middleware/teacherAuthentication.middleware.js';
const teacherRouter= express.Router();

teacherRouter.get('/',getAllTeachers); //Should be accessible to Only Admins.
teacherRouter.get('/:id',getTeacherById);
teacherRouter.get('/:id/courses',teacherAuthMiddleware,getCoursesByTeacherId);
teacherRouter.post('/courses',createNewCourse);
teacherRouter.get('/courses',teacherAuthMiddleware, getTeachersAllCourses  );
teacherRouter.post('/',adminAuthMiddleware,createNewTeacher); //Should be accessible to Only Admins.
export default teacherRouter;