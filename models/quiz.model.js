const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  length: { type: Number, required: true, min: 0, max: 50, default: 20 },
  questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MCQ", required: true },
  ],
  duration: { type: Number, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  // Other Quiz fields, such as description, tags, etc.
  tags: [{ type: String, min: 3, max: 12 }],
  description: { type: String, max: 100 },
  createdAt: { type: Date, default: new Date().toISOString() },
  updatedAt: { type: Date, default: new Date().toISOString() },
});
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
