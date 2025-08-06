import fs from "fs";
import path from "path";

import Category from "../models/category.js";
import handleImageUpload from "./../utils/functions/handleImageUpload.js";
import getBaseUrl from "./../utils/config.js";
import handleCloudinaryUpload from "./../utils/functions/handleCloudinaryUpload.js";

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

  // for (const img of input?.images || []) {
  //   const file = await img.file;
  //   const uploaded = await handleImageUpload(
  //     file,
  //     path.join(process.cwd(), "src", "uploads", "categories"),
  //     BASE_URL,
  //     "categories"
  //   );
  //   images.push({ ...uploaded, type: img.type });
  // }

  for (const img of input?.images || []) {
    const file = await img.file;
    const uploaded = await handleCloudinaryUpload(file, "categories");
    images.push({ ...uploaded, type: img.type });
  }

  const saved = await new Category({ ...input, images }).save();
  return saved;
};

export const updateCategoryService = async (id, input) => {
  categoryUpdateSchema.parse(input);

  // Check if category exists
  const existingCategory = await Category.findById(id);
  if (!existingCategory) throw new Error("Category not found.");

  const oldImages = existingCategory.images || [];

  // Separate existing (with URL) and new (with file)
  const incomingExisting = input.images?.filter((img) => img.url) || [];
  const incomingNew = input.images?.filter((img) => img.file) || [];

  // Identify images to delete (those not in incomingExisting)
  const imagesToDelete = oldImages.filter(
    (oldImg) => !incomingExisting.some((inImg) => inImg.url === oldImg.url)
  );

  // Delete images from Cloudinary
  for (const image of imagesToDelete) {
    if (image.publicId) {
      try {
        await cloudinary.uploader.destroy(image.publicId);
        console.log(`Deleted from Cloudinary: ${image.publicId}`);
      } catch (err) {
        console.error("Cloudinary delete error:", err.message);
      }
    }
  }

  // Keep existing images
  const updatedImages = [...incomingExisting];

  // Upload new images to Cloudinary
  for (const img of incomingNew) {
    const file = await img.file;
    const uploaded = await handleCloudinaryUpload(file, "categories");
    updatedImages.push({
      ...uploaded,
      type: img.type,
      altText: img.altText || uploaded.altText,
    });
  }

  // Update category in DB
  const updated = await Category.findByIdAndUpdate(
    id,
    { ...input, images: updatedImages },
    { new: true }
  );

  return updated;
};

// export const updateCategoryService = async (id, input, req) => {
//   categoryUpdateSchema.parse(input);
//   const existingCategory = await Category.findById(id);
//   if (!existingCategory) throw new Error("Category not found.");

//   console.log(input, "input");
//   const BASE_URL = getBaseUrl(req);
//   const oldImages = existingCategory.images || [];

//   console.log(oldImages, "oldImages");

//   const incomingExisting = input.images?.filter((img) => img.url) || [];

//   console.log(incomingExisting, "incomingExisting");

//   const incomingNew = input.images?.filter((img) => img.file) || [];

//   console.log(input, "input");
//   // Images to delete
//   const imagesToDelete = oldImages.filter((oldImg) => {
//     return !incomingExisting.some((inImg) => inImg.url === oldImg.url);
//   });

//   for (const image of imagesToDelete) {
//     if (!image.file) continue; // Skip if no file name

//     const filePath = path.join(
//       process.cwd(),
//       "src",
//       "uploads",
//       "categories",
//       image.file
//     );

//     console.log("Deleting:", filePath);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//   }

//   const updatedImages = [...incomingExisting];

//   for (const img of incomingNew) {
//     const file = await img.file;
//     const uploaded = await handleImageUpload(
//       file,
//       path.join(process.cwd(), "src", "uploads", "categories"),
//       BASE_URL,
//       "categories"
//     );
//     updatedImages.push({
//       ...uploaded,
//       type: img.type,
//       altText: img.altText || uploaded.altText,
//     });
//   }

//   const updated = await Category.findByIdAndUpdate(
//     id,
//     { ...input, images: updatedImages },
//     { new: true }
//   );

//   return updated;
// };

// export const deleteCategoryService = async (id) => {
//   const existing = await Category.findById(id);
//   if (!existing) throw new Error("Category not found.");

//   // Delete associated image files

//   for (const image of existing.images) {
//     if (!image.file) continue; // Skip if no file name

//     const filePath = path.join(
//       process.cwd(),
//       "src",
//       "uploads",
//       "categories",
//       image.file
//     );

//     console.log("Deleting:", filePath);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//   }

//   const deleted = await Category.findByIdAndDelete(id);
//   return !!deleted;
// };

export const deleteCategoryService = async (id) => {
  const existing = await Category.findById(id);
  if (!existing) throw new Error("Category not found.");

  // Delete associated images from Cloudinary
  for (const image of existing.images) {
    if (image.publicId) {
      try {
        await cloudinary.uploader.destroy(image.publicId);
        console.log(`Deleted from Cloudinary: ${image.publicId}`);
      } catch (err) {
        console.error(
          `Cloudinary delete error for ${image.publicId}:`,
          err.message
        );
      }
    }
  }

  // Delete category from DB
  const deleted = await Category.findByIdAndDelete(id);
  return !!deleted;
};

export const getAllCategoriesService = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

export const getCategoryByIdService = async (id) => {
  return await Category.findById(id);
};
