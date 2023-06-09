import mongoose from "mongoose";
import User from "./user.model.js";

const studentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
        quizzesTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizz' }],
        assignmentSubmitted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
        discussionPosts: [{}],
        enrolledCourses:[{}],
    }, {
    timestamps: true,
}
);
const Student = mongoose.model('Student',studentSchema);
export default Student;