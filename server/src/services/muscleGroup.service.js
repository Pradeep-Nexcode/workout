import fs from "fs";
import path from "path";
import MuscleGroup from "../models/muscleGroup.js";
import getBaseUrl from "../utils/config.js";
import handleImageUpload from "../utils/functions/handleImageUpload.js";

export const getAllMuscleGroupsService = async () => {
  return await MuscleGroup.find({ isActive: true });
};

export const getMuscleGroupByIdService = async (id) => {
  return await MuscleGroup.findById(id);
};

export const createMuscleGroupService = async (input, req) => {
  const exists = await MuscleGroup.findOne({ name: input.name });
  if (exists) throw new Error("Muscle group with this name already exists.");

  let image = {};
  const BASE_URL = getBaseUrl(req);

  if (input.image?.file) {
    const file = await input.image.file;
    const uploaded = await handleImageUpload(
      file,
      path.join(process.cwd(), "src", "uploads", "muscle-groups"),
      BASE_URL
    );
    image = {
      url: uploaded.url,
      file: uploaded.filename,
      altText: input.image.altText || "",
    };
  }

  const data = await MuscleGroup.create({
    ...input,
    image,
  });

  return data;
};

export const updateMuscleGroupService = async (id, input, req) => {
  const existing = await MuscleGroup.findById(id);
  if (!existing) throw new Error("Muscle group not found.");

  const BASE_URL = getBaseUrl(req);

  let image = existing.image || {};

  if (input.image?.file) {
    const file = await input.image.file;

    // delete old image
    const oldPath = path.join(process.cwd(), "src", "uploads", "muscle-groups", image.file || "");
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

    const uploaded = await handleImageUpload(
      file,
      path.join(process.cwd(), "src", "uploads", "muscle-groups"),
      BASE_URL
    );

    image = {
      url: uploaded.url,
      file: uploaded.filename,
      altText: input.image.altText || "",
    };
  }

  const updated = await MuscleGroup.findByIdAndUpdate(
    id,
    {
      ...input,
      image,
    },
    { new: true }
  );

  return updated;
};

export const deleteMuscleGroupService = async (id) => {
  const group = await MuscleGroup.findById(id);
  if (!group) throw new Error("Muscle group not found.");

  // delete image
  if (group.image?.file) {
    const filePath = path.join(process.cwd(), "src", "uploads", "muscle-groups", group.image.file);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  return await MuscleGroup.findByIdAndDelete(id);
};
