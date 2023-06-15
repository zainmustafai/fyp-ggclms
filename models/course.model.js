import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    title: { type: String, required: true,default:"NEW COURSE"},
    courseImage:{type:String},
    enrolledStudents:[{type:mongoose.Schema.Types, ref:'Student'}],
    teachers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'}],
    syllabusFile:{type: String,},
    discussionBoard:[{ type: mongoose.Schema.Types.ObjectId, ref: 'discussionBoard' }],
    folders:[{type:mongoose.Schema.Types.ObjectId}],
    lectureNotes:[],
    labNotes:[],
    homework:[],
    project:{},
    presentations:[],
    recommendedReadings:[],
    generalResources:[],
    Quizzes:[],
}
);
const Course = mongoose.model('Course', courseSchema);
export default Course;

// USER DEFINED METHODS
// **************************FIND COURSE BY CourseCode.
courseSchema.statics.findByCourseCode = async function (courseCode) {
    try {
      // Find the course with the given course code
      const course = await this.findOne({ courseCode });
  
      return course;
    } catch (error) {
      console.error('Error finding course by course code:', error);
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
      console.error('Error adding instructor:', error);
      throw error;
    }
  };
  