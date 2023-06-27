const uploadSingleFIleToCloudinary = async (filePath,folderName,fileName) => {
    // Upload the file to Cloudinary.
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
};
export default uploadSingleFIleToCloudinary;