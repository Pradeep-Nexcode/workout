import fs from "fs";
import path from "path";

import Category from "../models/category.js";
import handleImageUpload from "./../utils/functions/handleImageUpload.js";
import getBaseUrl from "./../utils/config.js";
import {
  categoryCreateSchema,
  categoryUpdateSchema,
} from "../utils/validations/category.validation.js";

export const createCategoryService = async (input, req) => {
  categoryCreateSchema.parse(input);

  const exists = await Category.findOne({ slug: input.slug });
  if (exists) throw new Error("Category with this slug already exists.");
  const BASE_URL = getBaseUrl(req);
  const images = [];

  for (const img of input?.images || []) {
    const file = await img.file;
    const uploaded = await handleImageUpload(
      file,
      path.join(process.cwd(), "src", "uploads", "categories"),
      BASE_URL
    );
    images.push({ ...uploaded, type: img.type });
  }

  const saved = await new Category({ ...input, images }).save();
  return saved;
};

export const updateCategoryService = async (id, input, req) => {
  categoryUpdateSchema.parse(input);
  const existingCategory = await Category.findById(id);
  if (!existingCategory) throw new Error("Category not found.");

  const BASE_URL = getBaseUrl(req);
  const oldImages = existingCategory.images || [];

  const incomingExisting = input.images?.filter((img) => img.url) || [];
  const incomingNew = input.images?.filter((img) => img.file) || [];

  // Images to delete
  const imagesToDelete = oldImages.filter((oldImg) => {
    return !incomingExisting.some((inImg) => inImg.url === oldImg.url);
  });

  for (const image of imagesToDelete) {
    const filePath = path.join(
      process.cwd(),
      "src",
      "uploads",
      "categories",
      image.file
    );

    console.log(filePath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  const updatedImages = [...incomingExisting];

  for (const img of incomingNew) {
    const file = await img.file;
    const uploaded = await handleImageUpload(
      file,
      path.join(process.cwd(), "src", "uploads", "categories"),
      BASE_URL
    );
    updatedImages.push({
      ...uploaded,
      type: img.type,
      altText: img.altText || uploaded.altText,
    });
  }

  const updated = await Category.findByIdAndUpdate(
    id,
    { ...input, images: updatedImages },
    { new: true }
  );

  return updated;
};

export const deleteCategoryService = async (id) => {
  const existing = await Category.findById(id);
  if (!existing) throw new Error("Category not found.");

  // Delete associated image files
  for (const img of existing.images || []) {
    const filePath = path.join(
      process.cwd(),
      "src",
      "uploads",
      "categories",
      img.file
    );
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  const deleted = await Category.findByIdAndDelete(id);
  return !!deleted;
};

export const getAllCategoriesService = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

export const getCategoryByIdService = async (id) => {
  return await Category.findById(id);
};
