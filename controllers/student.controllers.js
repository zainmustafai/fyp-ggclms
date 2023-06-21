import Student from "../models/student.model.js";
import User from "../models/user.model.js";
// READ ALL STUDENTS
export const getAllStudents = async (req, res) => {
  console.log("GET ALL STUDENTS ROUTE HAS REACHED.");
  try {
    const students = await Student.find().populate();
    console.log(students);
    res.status(200).json(students);
  } catch (err) {
    res.status(401).json({
      message: "Something went wrong",
    });
  }
};
// CREATE NEW STUDENT
export const createNewStudent = async (req, res) => {
 const {firstName,lastName, email, username, password, gender, } = req.body;
  try {
    const user = new User({firstName,lastName, email,username, password, gender, role:"Student"});
    user.save();
    console.log(user);
    const studentData = {
      user: user._id
    };
    const student = await Student.create(studentData);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete Student By ID:
export const deleteStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (student) {
      res.json({ message: "Student deleted successfully" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//   UPDATE STUDENT BY ID:
export const updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (updatedStudent) {
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
