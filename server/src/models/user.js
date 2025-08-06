import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true, // Ensures one account per Google ID
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures unique email
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String, // URL from Google
    },

    // Optional: App-specific fields
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    goal: {
      type: String,
      enum: ["Muscle Gain", "Fat Loss", "Strength", "General Fitness"],
      default: "General Fitness",
    },

    // Workout tracking
    totalWorkouts: {
      type: Number,
      default: 0,
    },
    completedWorkouts: {
      type: Number,
      default: 0,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ✅ Index for faster lookup
userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);
