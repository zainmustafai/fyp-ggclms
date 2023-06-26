import { v2 as cloudinary } from "cloudinary";
const uploadImageToCloudinary = async (imageFilePath, fileName) => {
  // Upload the file to Cloudinary.
  const result = await cloudinary.uploader.upload(
    imageFilePath,
    {
      public_id: fileName,
      // folder: 'test101/Test course/syllabus/test_syllabus_file.pdf',
      overwrite: true,
      image_metadata: false,
      // resource_type: "raw",
      pages: true,
    },
    function (error, result) {
      console.log(result);
    }
  );

  return result;
};

export default uploadImageToCloudinary;

// cloudinary.v2.api
//   .delete_resources(['test101_Test course_syllabus_test_syll_file.pdf'], 
//     { type: 'upload', resource_type: 'image' })
//   .then(console.log);
