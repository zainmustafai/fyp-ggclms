import { Router } from "express";
import {
  createNewCourse,
  downloadCourseSyllabus,
  getAllCourses,
  getCourseById,
  getResourcesCourseId,
  updateResources,
} from "../controllers/course.controllers.js";
import teacherAuthMiddleware from "../middleware/teacherAuthentication.middleware.js";
import postAuthMiddleware from "../middleware/postAuth.middleware.js";
import { createNewPost, getAllPosts } from "../controllers/post.controllers.js";
import {
  createNewEnrollment,
  getAllEnrollments,
} from "../controllers/enrollment.controllers.js";
import multer from "multer";

const upload = multer({ dest: 'tempfiles/' })

// const uploadArray = multer().array('file', 10);
const courseRouter = Router();
courseRouter.post("/", teacherAuthMiddleware, createNewCourse);
courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.get("/:id/resources", getResourcesCourseId); // FOR STUDENTS.
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
courseRouter.put("/:id/resources", upload.single("file"), updateResources); // UPLOAD RESOURCES.

/**************************************************ROUTES FOR DELETING COURSE RESOURCES ********************************************** */
courseRouter.delete("/:id/resources/:resourceId", (req, res) => {});
export default courseRouter;
