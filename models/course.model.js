import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  title: { type: String, required: true, default: "NEW COURSE" },
  about: { type: String, default: "NEW COURSE" },
  displayImage: { type: String },
  coverImage: { type: String },
  enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  syllabusFile: {
    filename: { type: String },
    publicId: { type: String },
    url: { type: String },
    asset_id: { type: String },
  },
  discussionBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "discussionBoard",
  },
  folders: [{ type: mongoose.Schema.Types.ObjectId }],
  lectureNotes: [
    {
      filename: { type: String },
      publicId: { type: String },
      url: { type: String },
      asset_id: { type: String },
    },
  ],
  labNotes: [
    {
      filename: { type: String },
      publicId: { type: String },
      url: { type: String },
      asset_id: { type: String },
    },
  ],
  homework: [
    {
      filename: { type: String },
      publicId: { type: String },
      url: { type: String },
      asset_id: { type: String },
    },
  ],
  project: {
    filename: { type: String },
    publicId: { type: String },
    url: { type: String },
    asset_id: { type: String },
  },
  presentations: [
    {
      filename: { type: String },
      publicId: { type: String },
      url: { type: String },
      asset_id: { type: String },
    },
  ],
  recommendedReadings: [
    {
      filename: { type: String },
      publicId: { type: String },
      url: { type: String },
      asset_id: { type: String },
    },
  ],
  generalResources: [
    {
      filename: { type: String },
      publicId: { type: String },
      url: { type: String },
      asset_id: { type: String },
    },
  ],
  Quizzes: [
    {
      filename: { type: String },
      publicId: { type: String },
      url: { type: String },
      asset_id: { type: String },
    },
  ],
  createdAt: { type: Date, default: new Date().toISOString() },
  updatedAt: { type: Date, default: new Date().toISOString() },
});
// USER DEFINED METHODS
// **************************FIND COURSE BY CourseCode.
courseSchema.statics.findByCourseCode = async function (courseCode) {
  try {
    // Find the course with the given course code
    const course = await this.findOne({ courseCode });
    return course;
  } catch (error) {
    console.error("Error finding course by course code:", error);
    throw error;
  }
};

//   *************************ADD INSTRUCTOR
courseSchema.methods.addInstructor = async function (instructorId) {
  try {
    // Add the instructor to the teachers array
    this.teachers.push(instructorId);
    // Save the updated course
    await this.save();
  } catch (error) {
    console.error("Error adding instructor:", error);
    throw error;
  }
};

const Course = mongoose.model("Course", courseSchema);
export default Course;
