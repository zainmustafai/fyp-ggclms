import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary:{},
    postType:{type: String, enum:['question','note']},
    folder: [{type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true }],
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isAnonymous: {type:Boolean, required: true, default: false},
    likes: {type: Number, default: 0 , min: 0},
    // Other Discussion Post fields as per your requirements
});

const Post = mongoose.model('Post', postSchema);

//following is a function that checks whether a user can delete the post or not.
postSchema.methods.canDelete = function (userRole) {
    // Define the roles that can delete the post (Teacher, Author, Admin)
    const allowedRoles = ['Teacher', 'Author', 'Admin'];
    // Check if the user role is in the allowed roles
    return allowedRoles.includes(userRole);
};
export default Post;
