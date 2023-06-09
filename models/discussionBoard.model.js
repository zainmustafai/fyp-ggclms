import mongoose from "mongoose";

const DiscussionBoardSchema = mongoose.Schema({
    
},{timestamps:true});
const DiscussionBoard = mongoose.Model('DiscussionBoard', DiscussionBoardSchema);
export default DiscussionBoard;