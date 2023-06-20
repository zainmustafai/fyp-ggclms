import mongoose from "mongoose";
const DiscussionBoardSchema = mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, unique: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
}, { timestamps: true });

const DiscussionBoard = mongoose.model('DiscussionBoard', DiscussionBoardSchema);

export default DiscussionBoard;
