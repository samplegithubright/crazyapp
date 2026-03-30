import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    title: String,
    description: String, // ✅ NEW
    url: String,
    editableUrl: String, // ✅ NEW (PSD/AI file)
    type: {
      type: String,
      enum: ["image", "video"],
    },
    category: String,
    subCategory: String,
  },
  { timestamps: true }
);

export default mongoose.models.Media ||
  mongoose.model("Media", MediaSchema);