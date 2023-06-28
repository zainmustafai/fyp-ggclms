
export const updateSyllabus = async (req, res) => {
    console.clear();
    console.log("Updating Syllabus");
    console.log(req.file);
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
  