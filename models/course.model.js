import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema({
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
const Course = mongoose.model('Course', CourseSchema);
export default Course;