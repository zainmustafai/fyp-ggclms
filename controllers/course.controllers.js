import Course from "../models/course.model.js";
import Teacher from "../models/teacher.model.js";
import DiscussionBoard from "../models/discussionBoard.model.js";
import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier"; // convert buffer to stream
import fs from "fs";
import uploadSingleFIleToCloudinary from "./utils/uploadSingleFileToCloudinary.js";

export const createNewCourse = async (req, res) => {
  console.log(req.body);
  try {
    // Extract the necessary data from the request body
    const { courseCode, title, about } = req.body;
    // Get the ID of the teacher who created the course
    const teacherUserId = req.user._id; // Assuming the authenticated user's ID is stored in req.user.id
    console.log("TEACHER USER ID IS : " + teacherUserId);
    const teacher = await Teacher.findByUserId(teacherUserId);
    console.log(teacher);
    // Create the course
    const course = new Course({
      courseCode,
      title,
      about,
      teachers: [], // Initialize an empty array for the teachers
    });
    course.teachers.push(teacher._id);
    // Save the course to the database
    await course.save();
    // Add the course to the teacher's list of courses
    if (teacher) {
      teacher.courses.push(course._id);
      await teacher.save();
    }
    // Create a discussion board for the course
    const discussionBoard = new DiscussionBoard({
      course: course._id,
      posts: [], // Initialize an empty array for the posts
    });

    // Save the discussion board to the database
    await discussionBoard.save();

    // Update the course with the discussion board's ID
    course.discussionBoard = discussionBoard._id;
    await course.save();

    res
      .status(201)
      .json({ success: true, message: "Course created successfully", course });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create course" });
  }
};
// Controller function to add a new teacher to the teachers array in the Course model
const addTeacherToCourse = async (req, res) => {
  const { courseId, teacherId } = req.body;
  try {
    // Find the course by courseId
    const course = await Course.findById(courseId);
    // If the course is not found, return an error
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    // Add the teacherId to the teachers array in the course
    course.teachers.push(teacherId);
    // Save the updated course
    await course.save();
    // Return the updated course
    return res.json(course);
  } catch (error) {
    console.error("Error adding teacher to course:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (course) {
      res.status(200).json({ course });
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Exception Caugtht:Internal server error" });
  }
};
export const getResourcesCourseId = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ error: "Exception Caugtht:Internal server error" });
  };
};
/*************************************************************************** UPDATE RESOURCES ******************************************************************************* */
export const updateResources = async (req, res) => {

  try {

    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    };
    const resourceType = req.body.resourceType;
    const date =req.body.date || new Date();
    const file = req.file;
    //Calculate the folder name
    const folder = course.courseCode.toString();
    // Calculate the file name
    const fileName = course.courseCode.toString() + "_" + resourceType;
    // UPLOAD FILE TO CLOUDINARY
    const result = await uploadSingleFIleToCloudinary(file.path, folder, fileName);
    // // DELETE FILE AFTER UPLOADING TO CLOUDINARY.
    // try {
    //   await fs.promises.unlink(file.path.toString());
    // } catch (error) {
    //   console.log(error);
    // }
    // UPDATE THE COURSE WITH THE NEW RESOURCE
    switch (resourceType) {
      case "syllabus":
        if (result) {
          course.syllabusFile = {
            filename: result.original_filename,
            url: result.url,
            publicId: result.public_id,
            asset_id: result.asset_id,
            date:date,
          };
          await course.save();
        }
        break;
      case "lecturenotes":
        if (result) {
          course.lectureNotes.push({
            filename: result.original_filename,
            url: result.url,
            publicId: result.public_id,
            asset_id: result.asset_id,
            date:date,
          });
          await course.save();
        }
        break;
      case "labnotes":
        if (result) {
          course.labNotes.push({
            filename: result.original_filename,
            url: result.url,
            publicId: result.public_id,
            asset_id: result.asset_id,
            date:date,
          });
          await course.save();
        }
        break;
      case "recommendedreadings":
        if (result) {
          course.recommendedReadings.push({
            filename: result.original_filename,
            url: result.url,
            publicId: result.public_id,
            asset_id: result.asset_id,
            date:date,
          });
          await course.save();
        }
        break;
      case "generalresources":
        if (result) {
          course.generalResources.push({
            filename: result.original_filename,
            url: result.url,
            publicId: result.public_id,
            asset_id: result.asset_id,
            date:date,
          });
          await course.save();
        }
        break;
      case "quizzes":
        if (result) {
          course.quizzes.push({
            filename: result.original_filename,
            url: result.url,
            publicId: result.public_id,
            asset_id: result.asset_id,
            date:date,

          });
          await course.save();
        }
        break;
      case "assignments":
        if (result) {
          course.assignments.push({
            filename: result.original_filename,
            url: result.url,
            publicId: result.public_id,
            asset_id: result.asset_id,
            date:date,

          });
          await course.save();
        }
        break;
      case "project":
        if (result) {
          course.projects.push({
            filename: result.original_filename,
            url: result.url,
            publicId: result.public_id,
            asset_id: result.asset_id,
            date:date,

          });
          await course.save();
        }
        break;
      case "presentations":
        if (result) {
          course.presentations.push({
            filename: result.original_filename,
            url: result.url,
            publicId: result.public_id,
            asset_id: result.asset_id,
            date:date,
          });
          await course.save();
        }
        break;
      default:
        return res.status(400).json({ error: "Invalid resource type" });
    }

    res.status(200).json({ message: "Course resources updated", course });
  } catch (error) {
    res.status(500).json({ error: "Exception Caugtht:Internal server error. Resources Not Updated" });
  };
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate();
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getCoursesByTeacherId = async (req, res) => {
  console.log("Getting Courses for : --", req.user);
  const userId = req.user._id;
  try {
    const teacher = await Teacher.findByUserId(userId);
    const courses = teacher.courses;
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// CONTROLLER FOR UPDATING SYLLABUS FILE;
export const updateSyllabus = async (req, res) => {
  try {
    const file = req.file;
    // Find the course by ID
    const course = await Course.findById(req.params.id);
    // If the course doesn't exist, return an error
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    console.log(req.file);
    const fileName = course.courseCode.toString() + "_syllabus"; // SET RELEVANTFILENAME
    const folderName = course.courseCode.toString() + course.title.toString();
    // UPLOAD FILE TO CLOUDINARY
    const result = await cloudinary.uploader.upload(
      file.path,
      {
        public_id: fileName,
        folder: folderName,
        overwrite: true,
        resource_type: "auto", // otherwise .pdf extension will be removed.
        pages: true,
      },
      function (error, result) {
        console.log(result);
      }
    );
    if (result) {
      course.syllabusFile = {
        filename: result.original_filename,
        url: result.url,
        publicId: result.public_id,
        asset_id: result.asset_id,
      };
      course.save();
    }
    // DELETE FILE AFTER UPLOADING TO CLOUDINARY.
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).json({ message: "Course syllabus updated", course });
  } catch (error) {
    console.error("Error updating course syllabus:", error);
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(error);
      }
    });
    res.status(500).json({
      error: "Internal server error: Exception Caught in updateSyllabus",
    });
  }
};

//
export const downloadCourseSyllabus = async (req, res) => {
  console.log("Downloading Syllabus");
  try {
    const courseId = req.params.id;
    // Find the course by ID
    const course = await Course.findById(courseId);
    // If the course doesn't exist, return an error
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    console.log("Course found");
    const asset_id = course.syllabusFile.asset_id;
    console.log(asset_id);

    cloudinary.config({
      cloud_name: "dqceqzjjv",
      api_key: "168676738987823",
      api_secret: "wngWUjqE5tMIGdnuGBkRO5ss3Rk",
      secure: true,
    });
    // Download the file from Cloudinary
    cloudinary.api
      .resource_by_asset_id([`216b4c63d75f00b3db37e01e3d2f6a18`])
      .then(console.log)
      .then((result) => {
        console.log(result);
        res.status(200).json({ message: "Course syllabus downloaded", result });
      });
  } catch (error) {
    console.error("Error downloading course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
