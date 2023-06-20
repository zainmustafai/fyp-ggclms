import Enrollment from "../models/enrollment.model.js";

export const createNewEnrollment = async (req, res) => {
  try {
    // Retrieve the student ID and course ID from the request body
    const { studentId } = req.body;
    const courseId = req.params.id;
    // Create a new Enrollment instance
    const enrollment = new Enrollment({
      student: studentId,
      course: courseId,
    });

    // Save the enrollment
    await enrollment.save();

    res.status(201).json({ enrollment });
  } catch (error) {
    console.error("Error creating enrollment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    // Retrieve the enrollment ID from the request parameters
    const { enrollmentId } = req.params;

    // Delete the enrollment
    await Enrollment.findByIdAndDelete(enrollmentId);

    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllEnrollments = async (req, res) => {
  console.log("Getting all Enrollments");
};
