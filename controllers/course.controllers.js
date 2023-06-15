// import Course from '../models/course.model.js';

// Create a new course
export const createNewCourse = async (req, res) => {
  // This controller must be called by a teacher only.
  try {
    const {courseCode,title} = req.body;
    const newCourse = await Course.create({});
    res.json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Get a course by ID
// export const getCourseById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const course = await Course.findById(id);
//     if (course) {
//       res.json(course);
//     } else {
//       res.status(404).json({ message: 'Course not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update a course by ID
// export  const updateCourseById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });

//     if (updatedCourse) {
//       res.json(updatedCourse);
//     } else {
//       res.status(404).json({ message: 'Course not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete a course by ID
// export  const deleteCourseById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedCourse = await Course.findByIdAndDelete(id);

//     if (deletedCourse) {
//       res.json({ message: 'Course deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Course not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
