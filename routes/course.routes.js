import { Router } from "express";
import { createNewCourse, createNewPost, getAllCourses, getAllPosts, getCourseById } from "../controllers/course.controllers.js";
import teacherAuthMiddleware from "../middleware/teacherAuthentication.middleware.js";

const courseRouter = Router();
courseRouter.post('/',teacherAuthMiddleware ,createNewCourse);
courseRouter.get('/',getAllCourses);
courseRouter.get('/:id',getCourseById);
courseRouter.post('/:id/posts',createNewPost);
courseRouter.get('/:id/posts',getAllPosts);
export default courseRouter;