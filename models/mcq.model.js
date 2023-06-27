import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  // Other MCQ fields, such as difficulty level, explanation, etc.
  createdAt: { type: Date, default: new Date().toISOString() },
  updatedAt: { type: Date, default: new Date().toISOString() },
});

const MCQ = mongoose.model("MCQ", mcqSchema);
export default MCQ;
