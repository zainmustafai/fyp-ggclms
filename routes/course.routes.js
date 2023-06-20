import { Router } from "express";
import { createNewCourse, getAllCourses, getCourseById } from "../controllers/course.controllers.js";
import teacherAuthMiddleware from "../middleware/teacherAuthentication.middleware.js";
import postAuthMiddleware from "../middleware/postAuth.middleware.js";
import { createNewPost, getAllPosts } from "../controllers/post.controllers.js";
import { getAllEnrollments } from "../controllers/enrollment.controllers.js";

const courseRouter = Router();
courseRouter.post('/',teacherAuthMiddleware ,createNewCourse);
courseRouter.get('/',getAllCourses);
courseRouter.get('/:id',getCourseById);
// POSTS
courseRouter.get('/:id/posts',getAllPosts);
courseRouter.post('/:id/posts',postAuthMiddleware,createNewPost);
// ENROLLMENTS
courseRouter.get('/:id/enrollments',getAllEnrollments);
courseRouter.post('/:id/enrollments');

export default courseRouter;