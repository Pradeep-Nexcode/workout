import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        url: { type: String, required: true }, // image CDN path
        altText: { type: String, default: "" }, // accessibility
        file: { type: String, required: true },
        type: {
          type: String,
          enum: ["icon", "banner", "thumbnail"],
          default: "thumbnail",
        },
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
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

export default mongoose.model("Category", categorySchema);
