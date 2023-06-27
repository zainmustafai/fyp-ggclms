import { Router } from "express";
import {
  createNewCourse,
  downloadCourseSyllabus,
  getAllCourses,
  getCourseById,
  getResourcesCourseId,
  updateResources,
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, 'tempfiles/');
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded files
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: 'tempfiles/' });
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
courseRouter.put("/:id/syllabus",  upload.single("syllabusFile"), updateSyllabus); // UPLOAD SYLLABUS ->FOR Syllabus only
courseRouter.put("/:id/resources", upload.single('file'), updateResources); // UPLOAD RESOURCES.


export default courseRouter;
