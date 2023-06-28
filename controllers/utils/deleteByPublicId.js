import { v2 as cloudinary } from 'cloudinary';
const deleteByPublicId = async (publicId) => {
    try{
        await cloudinary.uploader.destroy(publicId);
        return true;
    }catch(err){
        console.log(err);
    };
};
export default deleteByPublicId;