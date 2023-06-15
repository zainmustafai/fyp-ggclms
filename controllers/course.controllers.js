import Course from "../models/course.model.js";
import Teacher from "../models/teacher.model.js";

export const createNewCourse = async (req, res) => {
  try {
    // Extract the necessary data from the request body
    const { courseCode, title, courseImage, syllabusFile } = req.body;
    // Get the ID of the teacher who created the course
    const teacherId = req.user.id; // Assuming the authenticated user's ID is stored in req.user.id
    // Create the course
    const course = new Course({
      courseCode,
      title,
      teachers: [] // Initialize an empty array for the teachers
    });
    course.teachers.push(teacherId);
    // Save the course to the database
    await course.save();
    // Add the course to the teacher's list of courses
    const teacher = await Teacher.findById(teacherId);
    teacher.courses.push(course._id);
    await teacher.save();

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
      return res.status(404).json({ error: 'Course not found' });
    }

    // Add the teacherId to the teachers array in the course
    course.teachers.push(teacherId);

    // Save the updated course
    await course.save();

    // Return the updated course
    return res.json(course);
  } catch (error) {
    console.error('Error adding teacher to course:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
