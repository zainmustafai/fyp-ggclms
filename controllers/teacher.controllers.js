import Teacher from '../models/teacher.model.js';

// Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const newTeacher = await Teacher.create(req.body);
    res.json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
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

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true });

    if (updatedTeacher) {
      res.json(updatedTeacher);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
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
      res.json({ message: 'Teacher deleted successfully' });
    } else {
      res.status(404).json({ message: 'Teacher not found' });
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