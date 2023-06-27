import mongoose from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: new Date().toISOString() },
    updatedAt: { type: Date, default: new Date().toISOString() },
  },
  {
    timestamps: true,
  }
);
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
