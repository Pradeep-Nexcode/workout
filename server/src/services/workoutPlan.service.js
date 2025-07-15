import fs from "fs";
import path from "path";
import WorkoutPlan from "../models/workoutPlan.js";
import getBaseUrl from "../utils/config.js";
import handleImageUpload from "../utils/functions/handleImageUpload.js";

export const getAllWorkoutPlansService = async () => {
  return await WorkoutPlan.find({ isActive: true });
};

export const getWorkoutPlanByIdService = async (id) => {
  return await WorkoutPlan.findById(id);
};

export const createWorkoutPlanService = async (input, req) => {
  const exists = await WorkoutPlan.findOne({ slug: input.slug });
  if (exists) throw new Error("Workout plan with this slug already exists.");

  const BASE_URL = getBaseUrl(req);

  let image = {};
  if (input.image?.file) {
    const file = await input.image.file;
    const uploaded = await handleImageUpload(
      file,
      path.join(process.cwd(), "src", "uploads", "workout-plans"),
      BASE_URL
    );
    image = {
      url: uploaded.url,
      file: uploaded.filename,
      altText: input.image.altText || "",
    };
  }

  const slug = input.slug || input.name.toLowerCase().replace(/\s+/g, "-");

  const plan = await WorkoutPlan.create({
    ...input,
    slug,
    image,
    createdBy: req?.user?._id || null,
  });

  return plan;
};

export const updateWorkoutPlanService = async (id, input, req) => {
  const plan = await WorkoutPlan.findById(id);
  if (!plan) throw new Error("Workout plan not found.");

  const BASE_URL = getBaseUrl(req);

  let image = plan.image;
  if (input.image?.file) {
    const file = await input.image.file;

    if (image?.file) {
      const oldPath = path.join(process.cwd(), "src", "uploads", "workout-plans", image.file);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const uploaded = await handleImageUpload(
      file,
      path.join(process.cwd(), "src", "uploads", "workout-plans"),
      BASE_URL
    );

    image = {
      url: uploaded.url,
      file: uploaded.filename,
      altText: input.image.altText || "",
    };
  }

  const slug = input.slug || input.name?.toLowerCase().replace(/\s+/g, "-");

  return await WorkoutPlan.findByIdAndUpdate(
    id,
    { ...input, slug, image },
    { new: true }
  );
};

export const deleteWorkoutPlanService = async (id) => {
  const plan = await WorkoutPlan.findById(id);
  if (!plan) throw new Error("Workout plan not found.");

  if (plan.image?.file) {
    const filePath = path.join(process.cwd(), "src", "uploads", "workout-plans", plan.image.file);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  return await WorkoutPlan.findByIdAndDelete(id);
};
