import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  createdAt: { type: Date, default: new Date().toISOString() },
  updatedAt: { type: Date, default: new Date().toISOString() },
});
teacherSchema.statics.findByUserId = async function (userId) {
  try {
    const teacher = await this.findOne({ user: userId }).populate("courses");
    return teacher;
  } catch (error) {
    console.error("Error finding teacher by user ID:", error);
    throw error;
  }
};

teacherSchema.statics.findByUserId = async function (userId) {
  try {
    const teacher = await this.findOne({ user: userId }).populate("courses");
    return teacher;
  } catch (error) {
    console.error("Error finding teacher by user ID:", error);
    throw error;
  }
};

teacherSchema.methods.hasCourse = function (courseId) {
  return this.courses.some((course) => course.equals(courseId));
};
//
teacherSchema.methods.canDelete = function (userRole) {
  // Define the roles that can delete.
  const allowedRoles = "Admin"; //
  // Check if the user role is in the allowed roles
  return allowedRoles == "Admin";
};

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
