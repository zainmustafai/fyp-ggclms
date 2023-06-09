import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  // Other Folder fields as per your requirements
});

const Folder = mongoose.model('Folder', folderSchema);

export default Folder;
