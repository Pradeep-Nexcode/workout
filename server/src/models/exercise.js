import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    type: {
      type: String,
      enum: ["Compound", "Isolation", "Bodyweight"],
      required: true,
    },
    primaryMuscles: {
      type: [String], // e.g., ["Chest", "Triceps"]
      required: true,
    },
    equipment: {
      type: [String], // e.g., ["Barbell", "Bench"]
      required: true,
    },
    instructions: {
      type: [String], // step-by-step guide
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    image: {
      url: { type: String, required: false }, // CDN or uploaded
      altText: { type: String, default: "" },
      file: { type: String, required: false }, // file name if stored
    },
    images: [
      {
        url: { type: String, required: false }, // CDN or uploaded
        altText: { type: String, default: "" },
        file: { type: String, required: false },
      },
    ],
    videoUrl: {
      type: String, // Optional: YouTube/Vimeo/CDN video
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Exercise", exerciseSchema);
