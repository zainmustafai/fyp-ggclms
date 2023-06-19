import { Router } from "express";
import { createNewCourse, getAllCourses } from "../controllers/course.controllers.js";
import teacherAuthMiddleware from "../middleware/teacherAuthentication.middleware.js";

const courseRouter = Router();
courseRouter.post('/',teacherAuthMiddleware ,createNewCourse);
courseRouter.get('/',getAllCourses);
export default courseRouter;