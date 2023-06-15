import mongoose from 'mongoose';
const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
});
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
