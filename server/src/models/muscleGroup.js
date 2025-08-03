import mongoose from "mongoose";

const muscleGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    region: {
      type: String, // e.g., "Chest", "Back", "Arms", "Legs"
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      url: { type: String },
      file: { type: String },
      altText: { type: String, default: "" },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MuscleGroup", muscleGroupSchema);
