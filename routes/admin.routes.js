import express from "express";
import authenticationMiddleware from "../middleware/authentication.middleware.js";
import { getAllUsers } from "../controllers/user.controllers.js";
import { createNewStudent, deleteStudentById, getAllStudents } from "../controllers/student.controllers.js";
// import { getAllCourses } from "../controllers/course.controllers.js";

const adminRouter = express.Router();
// USERS
adminRouter.get('/users',authenticationMiddleware,getAllUsers);
// STUDENTS
adminRouter.get('/students',authenticationMiddleware,getAllStudents);
adminRouter.get('/students/:id',authenticationMiddleware,getAllStudents);
adminRouter.post('/students',authenticationMiddleware,createNewStudent);
adminRouter.post('/students/:id',authenticationMiddleware,createNewStudent);
adminRouter.get('/students/:id',()=>{});
adminRouter.delete('/students/:id',deleteStudentById);
// TEACHERS
adminRouter.post('/createNewTeacher',authenticationMiddleware,()=>{});
adminRouter.delete('/deleteTeacherById',authenticationMiddleware,()=>{});
adminRouter.get('/teachers',authenticationMiddleware,()=>{}); // get all teachers
adminRouter.post('/teachers',authenticationMiddleware,)
//COURSES
adminRouter.get('/courses',()=>{});
adminRouter.get('/courses/:id',()=>{});
//Students
export default adminRouter;