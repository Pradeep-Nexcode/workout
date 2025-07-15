import fs from "fs";
import path from "path";

import Exercise from "../models/exercise.js";

import handleImageUpload from "./../utils/functions/handleImageUpload.js";
import getBaseUrl from "./../utils/config.js";
import { exerciseCreateSchema } from "./../utils/validations/exercise.validation.js";

export const getAllExercisesService = async () => {
  const data = await Exercise.find({ isActive: true });
  return data;
};


export const getExerciseByIdService = async (id) => {
  const data = await Exercise.findById(id);
  return data;
};

export const createExerciseService = async (input, req) => {
  exerciseCreateSchema.parse(input);

  const exists = await Exercise.findOne({ slug: input.slug });
  if (exists && exists._id.toString() !== id) {
    throw new Error("Exercise with this slug already exists.");
  }
  const BASE_URL = getBaseUrl(req);
  const images = [];

  for (const img of input?.images || []) {
    const file = await img.file;
    const uploaded = await handleImageUpload(
      file,
      path.join(process.cwd(), "src", "uploads", "exercises"),
      BASE_URL
    );
    images.push({ ...uploaded, type: img.type });
  }

  const data = await Exercise.create({ ...input, images });
  return data;
};

export const updateExerciseService = async (id, input, req) => {
  exerciseUpdateSchema.parse(input);
  const exists = await Exercise.findOne({ slug: input.slug });
  if (exists) throw new Error("Exercise with this slug already exists.");

  const oldExercise = await Exercise.findById(id);
  if (!oldExercise) throw new Error("Exercise not found.");
  const BASE_URL = getBaseUrl(req);
  const oldImages = oldExercise.images || [];
  const incomingExisting = input.images?.filter((img) => img.url) || [];
  const incomingNew = input.images?.filter((img) => img.file) || [];
  const images = [...oldImages];
  for (const img of incomingExisting) {
    const index = images.findIndex((i) => i.url === img.url);
    if (index !== -1) {
      images[index] = img;
    }
  }
  for (const img of incomingNew) {
    const file = await img.file;
    const uploaded = await handleImageUpload(
      file,
      path.join(process.cwd(), "src", "uploads", "exercises"),
      BASE_URL
    );
    images.push({ ...uploaded, type: img.type });
  }

  input.images = images;

  // Delete associated image files
  for (const img of oldImages) {
    const filePath = path.join(
      process.cwd(),
      "src",
      "uploads",
      "exercises",
      img.file
    );
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  const data = await Exercise.findByIdAndUpdate(id, input, { new: true });
  return data;
};

export const deleteExerciseService = async (id) => {
  const exercise = await Exercise.findById(id);
  if (!exercise) throw new Error("Exercise not found.");

  // Delete associated image files
  for (const img of exercise.images || []) {
    const filePath = path.join(
      process.cwd(),
      "src",
      "uploads",
      "exercises",
      img.file
    );
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  // Delete exercise
  const data = await Exercise.findByIdAndDelete(id);
  return data;
};
