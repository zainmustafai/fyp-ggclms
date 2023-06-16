import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});
const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;

teacherSchema.methods.canDelete = function (userRole) {
    // Define the roles that can delete.
    const allowedRoles = 'Admin'; //
    // Check if the user role is in the allowed roles
    return (allowedRoles=="Admin");
};