import Teacher from "../models/teacher.model.js";
import User from "../models/user.model.js";

// Create a new teacher
export const createNewTeacher = async (req, res) => {
  console.log("CREATING NEW TEACHER>>>");
  try {
    console.log(req.body);
    const { firstName, lastName, gender, username, email, password } = req.body;
    // Create a new user
    const user = new User({
      firstName,
      lastName,
      gender,
      username,
      email,
      password,
      role: "Teacher", // NOTE: Role is not gotten from req.body;
    });
    // Save the user
    await user.save();
    // Create a new teacher with the user reference
    const teacher = new Teacher({
      user: user._id,
    });
    // Save the teacher
    await teacher.save();
    // CONNECT USER AND TEACHER IN BOTH WAYS.
    user.profile = teacher._id;
    await user.save()
    res.status(201).json({ message: "Teacher created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("user");
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get a teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id).populate();
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a teacher by ID
export const updateTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (updatedTeacher) {
      res.json(updatedTeacher);
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a teacher by ID
export const deleteTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (deletedTeacher) {
      res.json({ message: "Teacher deleted successfully" });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 * 
 * 
createTeacher: Handles the creation of a new teacher by receiving the request body and creating a new Teacher document in the database.
getAllTeachers: Retrieves all teachers from the database and sends the array of teachers as the response.
getTeacherById: Retrieves a teacher based on the provided ID in the request parameters and sends the teacher document as the response. If the teacher is not found, it sends a 404 error.
updateTeacherById: Updates a teacher based on the provided ID in the request parameters. It uses the request body to update the teacher document and sends the updated teacher as the response. If the teacher is not found, it sends a 404 error.
deleteTeacherById: Deletes a teacher based on the provided ID in the request parameters. If the deletion is successful, it sends a success message as the response. If the teacher is not found, it sends a 404 error.

 */

export const getTeachersAllCourses = (req, res) => {
  const teacherID = req.teacher._id;
  try {
    console.log(teacherID);
  } catch (e) {}
};
