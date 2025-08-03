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
      index: true, // quick lookup
    },
    type: {
      type: String,
      enum: ["Compound", "Isolation", "Bodyweight"],
      required: true,
    },
    primaryMuscles: {
      type: [String], 
      required: true,
    },
    equipment: {
      type: [String], 
      required: true,
    },
    instructions: {
      type: [String], 
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    image: {
      url: { type: String },
      altText: { type: String, default: "" },
      file: { type: String },
    },
    images: [
      {
        url: { type: String },
        altText: { type: String, default: "" },
        file: { type: String },
      },
    ],
    videoUrl: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true, // for active filtering
    },
  },
  { timestamps: true }
);

// ✅ Text index for search
exerciseSchema.index({ name: "text", primaryMuscles: "text" });

// ✅ Category index for filtering
exerciseSchema.index({ category: 1 });

// ✅ CreatedAt index for pagination/sorting
exerciseSchema.index({ createdAt: -1 });

export default mongoose.model("Exercise", exerciseSchema);
