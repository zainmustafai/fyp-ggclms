import mongoose from "mongoose";
import User from "./user.model.js";

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizzesTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quizz" }],
    assignmentSubmitted: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
    ],
    discussionPosts: [{}],
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" }],
  },
  {
    timestamps: true,
  }
);

studentSchema.statics.findByUserId = async function (userId) {
  try {
    const student = await this.findOne({ user: userId })
      .populate("quizzesTaken")
      .populate("assignmentSubmitted")
      .populate("enrollments");

    return student;
  } catch (error) {
    console.error("Error finding student by user ID:", error);
    throw error;
  }
};

studentSchema.methods.isEnrolledInCourse = function (courseId) {
  // Check if the student's enrollments array contains the given course ID
  return this.enrollments.some((enrollment) => enrollment.equals(courseId));
};

const Student = mongoose.model("Student", studentSchema);
export default Student;
