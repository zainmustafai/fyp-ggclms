import Course from "../models/course.model.js";
import Teacher from "../models/teacher.model.js";
import DiscussionBoard from "../models/discussionBoard.model.js";
import Post from "../models/post.model.js";

export const createNewCourse = async (req, res) => {
  console.log(req.teacher);
  console.log(req.body.courseCode);
  // try {
  //   // Extract the necessary data from the request body
  //   const { courseCode, title } = req.body;
  //   // Get the ID of the teacher who created the course
  //   const teacherUserId = req.user._id; // Assuming the authenticated user's ID is stored in req.user.id
  //   console.log("TEACHER USER ID IS : " + teacherUserId);
  //   const teacher = await Teacher.findByUserId(teacherUserId);
  //   console.log(teacher);
  //   // Create the course
  //   const course = new Course({
  //     courseCode,
  //     title,
  //     teachers: [], // Initialize an empty array for the teachers
  //   });
  //   course.teachers.push(teacher._id);
  //   // Save the course to the database
  //   await course.save();
  //   // Add the course to the teacher's list of courses
  //   if (teacher) {
  //     teacher.courses.push(course._id);
  //     await teacher.save();
  //   }
  //   // Create a discussion board for the course
  //   const discussionBoard = new DiscussionBoard({
  //     course: course._id,
  //     posts: [], // Initialize an empty array for the posts
  //   });

  //   // Save the discussion board to the database
  //   await discussionBoard.save();

  //   // Update the course with the discussion board's ID
  //   course.discussionBoard = discussionBoard._id;
  //   await course.save();

  //   res
  //     .status(201)
  //     .json({ success: true, message: "Course created successfully", course });
  // } catch (error) {
  //   console.error(error);
  //   res
  //     .status(500)
  //     .json({ success: false, message: "Failed to create course" });
  // }
};
// Controller function to add a new teacher to the teachers array in the Course model
const addTeacherToCourse = async (req, res) => {
  const { courseId, teacherId } = req.body;
  try {
    // Find the course by courseId
    const course = await Course.findById(courseId);
    // If the course is not found, return an error
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    // Add the teacherId to the teachers array in the course
    course.teachers.push(teacherId);
    // Save the updated course
    await course.save();
    // Return the updated course
    return res.json(course);
  } catch (error) {
    console.error("Error adding teacher to course:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (course) {
      res.status(200).json({ course });
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Exception Caugtht:Internal server error" });
  }
};
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate();
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getCoursesByTeacherId = async (req, res) => {
  console.log("Getting Courses for : --", req.user);
  const userId = req.user._id;
  try {
    const teacher = await Teacher.findByUserId(userId);
    console.log(teacher.courses);
    const courses = teacher.courses;
    res.status(200).json(courses);
  } catch (err) {

  }
};

