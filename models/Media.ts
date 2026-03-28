import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    type: {
      type: String,
      enum: ["image", "video"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Media ||
  mongoose.model("Media", MediaSchema);