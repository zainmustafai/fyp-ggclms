import {v2 as cloudinary} from "cloudinary";
const uploadSingleFIleToCloudinary = async (filePath, folderName, fileName) => {
  try {
    // Upload the file to Cloudinary.
    console.log("Uploading file to cloudinary...");
    const result = await cloudinary.uploader.upload(
      filePath,
      {
        public_id: fileName,
        folder: folderName,
        overwrite: true,
        image_metadata: false,
        resource_type: "auto",
        pages: true,
      },
      function (error, result) {
        console.log(result);
      }
    );
    return result;
  } catch (error) {
    console.clear();
    console.error("Error uploading file to cloudinary:", error);
  }
};
export default uploadSingleFIleToCloudinary;
