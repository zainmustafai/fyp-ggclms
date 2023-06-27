
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const stream = streamifier.createReadStream(file.buffer);

cloudinary.uploader.upload_stream({
  resource_type: 'auto',
  folder: 'my_folder'
}, function (error, result) {
  console.log(result, error);
}).end(stream);

(
  // const fileName = `${course.courseCode}_${course.title}_syllabus_${req.file.originalname}`;
// // Upload the file to Cloudinary.
// const result = await cloudinary.uploader.upload(req.file.path.toString(), {
//   public_id: fileName,
//   resource_type: 'raw',
//   folder: course.courseCode.toString(),
//   pages: true,
// });

// // Store the file information in the syllabusFile field of the Course document
// course.syllabusFile = {
//   filename: result.original_filename,
//   publicId: result.public_id,
//   url: result.secure_url,
//   asset_id: result.asset_id,
// };
// // Save the updated course document
// //await course.save();

// // Return the updated course
res.status(200).json({ message: 'Course syllabus updated', course });
)