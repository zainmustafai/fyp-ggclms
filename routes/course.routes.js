import { Router } from "express";
import {
  createNewCourse,
  downloadCourseSyllabus,
  getAllCourses,
  getCourseById,
  updateSyllabus,
} from "../controllers/course.controllers.js";
import teacherAuthMiddleware from "../middleware/teacherAuthentication.middleware.js";
import postAuthMiddleware from "../middleware/postAuth.middleware.js";
import { createNewPost, getAllPosts } from "../controllers/post.controllers.js";
import {
  createNewEnrollment,
  getAllEnrollments,
} from "../controllers/enrollment.controllers.js";
import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary"; //FOR ME: MUST RESEARCH ABOUT IT.
// import { v2 as cloudinary } from "cloudinary";

// Storage for the uploaded files
//  

// const upload = multer({ storage: storage });
const upload = multer({ dest: 'tempfiles/' });
const courseRouter = Router();
courseRouter.post("/", teacherAuthMiddleware, createNewCourse);
courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.get("/:id/syllabus", downloadCourseSyllabus);
// POSTS
courseRouter.get("/:id/posts", getAllPosts);
courseRouter.post("/:id/posts", postAuthMiddleware, createNewPost);
// ENROLLMENTS
courseRouter.get("/:id/enrollments", teacherAuthMiddleware, getAllEnrollments);
courseRouter.post(
  "/:id/enrollments",
  teacherAuthMiddleware,
  createNewEnrollment
);

/**************************************************ROUTES FOR UPDATING COURSES ********************************************** */
//*---------------- */ Course Syllabus
courseRouter.put("/:id/syllabus", teacherAuthMiddleware,upload.single("syllabusFile"),updateSyllabus);
courseRouter.put("/:id/lectureNotes", teacherAuthMiddleware);

export default courseRouter;
