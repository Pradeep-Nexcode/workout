import mongoose from "mongoose";

const userWorkoutPlanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    date: { type: Date, required: false }, // e.g., 2025-07-23
    targetMuscles: [{ type: String }], // optional tagging

    exercises: [
      {
        exerciseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
          required: true,
        },
        sets: Number,
        reps: String,
        rest: String,
        completed: { type: Boolean, default: false },
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Completed", "Skipped"],
      default: "Pending",
    },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("UserWorkoutPlan", userWorkoutPlanSchema);
