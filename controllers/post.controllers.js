import Course from "../models/course.model.js";
import DiscussionBoard from "../models/discussionBoard.model.js";
import Post from "../models/post.model.js";

/*******************************************************POSTs */
export const createNewPost = async (req, res) => {
    console.log("Create new post route reached!");
  };
  
  export const getAllPosts = async (req, res) => {
    console.log("GET ALL POSTS ROUTE REACHED");
    try {
      // Retrieve the course ID from the request parameters
      const courseId = req.params.id;
  
      // Find the discussion board associated with the course
      const discussionBoard = await DiscussionBoard.findOne({ course: courseId });
  
      // If the discussion board doesn't exist, return an error
      if (!discussionBoard) {
        return res.status(404).json({ error: "Discussion board not found" });
      }
  
      // Retrieve all the posts in the discussion board
      const posts = await Post.find({ _id: { $in: discussionBoard.posts } });
  
      // Return the posts
      res.status(200).json({ posts });
    } catch (error) {
      console.error("Error retrieving posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };