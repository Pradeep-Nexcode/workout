import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema(
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
    goal: {
      type: String,
      enum: ["Muscle Gain", "Fat Loss", "Strength", "Endurance", "General Fitness"],
      default: "Muscle Gain",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    daysPerWeek: {
      type: Number,
      default: 3,
    },
    workoutDays: [
      {
        day: {
          type: String, // e.g., "Monday", "Day 1"
          required: true,
        },
        focus: {
          type: String, // e.g., "Chest & Triceps", "Legs"
          required: true,
        },
        exercises: [
          {
            exerciseId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Exercise",
              required: true,
            },
            sets: Number,
            reps: String, // e.g., "10-12"
            rest: String, // Optional: "60s", etc.
          },
        ],
      },
    ],
    image: {
      url: { type: String },
      file: { type: String },
      altText: { type: String, default: "" },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      required: false
    },
  },
  { timestamps: true }
);

export default mongoose.model("WorkoutPlan", workoutPlanSchema);
