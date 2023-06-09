import express, { Router } from 'express';
import {createNewCourse} from '../controllers/course.controllers.js';
const teacherRouter= express.Router();
teacherRouter.post('/courses',createNewCourse);
export default teacherRouter;