import Course from "../models/course.model.js";
import Teacher from "../models/teacher.model.js";
import DiscussionBoard from "../models/discussionBoard.model.js";
import Post from "../models/post.model.js";

export const createNewCourse = async (req, res) => {
  console.log(req.teacher);
  try {
    // Extract the necessary data from the request body
    const { courseCode, title } = req.body;
    // Get the ID of the teacher who created the course
    const teacherUserId = req.user._id; // Assuming the authenticated user's ID is stored in req.user.id
    console.log("TEACHER USER ID IS : " + teacherUserId);
    const teacher = await Teacher.findByUserId(teacherUserId);
    console.log(teacher);
    // Create the course
    const course = new Course({
      courseCode,
      title,
      teachers: [], // Initialize an empty array for the teachers
    });
    course.teachers.push(teacher._id);
    // Save the course to the database
    await course.save();
    // Add the course to the teacher's list of courses
    if (teacher) {
      teacher.courses.push(course._id);
      await teacher.save();
    }

    // Create a discussion board for the course
    const discussionBoard = new DiscussionBoard({
      course: course._id,
      posts: [], // Initialize an empty array for the posts
    });

    // Save the discussion board to the database
    await discussionBoard.save();

    // Update the course with the discussion board's ID
    course.discussionBoard = discussionBoard._id;
    await course.save();

    res
      .status(201)
      .json({ success: true, message: "Course created successfully", course });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create course" });
  }
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

/*******************************************************POSTs */
export const createNewPost = async (req, res) => {
  console.log("Create new post route reached!");
};

export const getAllPosts = async (req, res) => {
  console.log("GET ALL POSTS ROUTE REACHED");
  try {
    // Retrieve the course ID from the request parameters
    const courseId = req.params.id;

    // Find the discussion board associated with the course
    const discussionBoard = await DiscussionBoard.findOne({ course: courseId });

    // If the discussion board doesn't exist, return an error
    if (!discussionBoard) {
      return res.status(404).json({ error: "Discussion board not found" });
    }

    // Retrieve all the posts in the discussion board
    const posts = await Post.find({ _id: { $in: discussionBoard.posts } });

    // Return the posts
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
