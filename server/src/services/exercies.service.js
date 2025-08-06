import fs from "fs";
import path from "path";

import Exercise from "../models/exercise.js";

import handleImageUpload from "./../utils/functions/handleImageUpload.js";
import getBaseUrl from "./../utils/config.js";
import {
  exerciseCreateSchema,
  exerciseUpdateSchema,
} from "./../utils/validations/exercise.validation.js";
import handleCloudinaryUpload from "../utils/functions/handleCloudinaryUpload.js";

export const getAllExercisesService = async ({
  page = 1,
  limit = 10,
  search = "",
  category = null,
  isActive = true,
}) => {
  // Convert to numbers
  page = parseInt(page);
  limit = parseInt(limit);

  const query = {};

  // 🔍 Search by text
  if (search) {
    query.$text = { $search: search };
  }

  // 📂 Filter by category
  if (category) {
    query.category = category;
  }

  // ✅ Filter by active status
  if (typeof isActive === "boolean") {
    query.isActive = isActive;
  }

  // Count total for pagination
  const total = await Exercise.countDocuments(query);

  // Paginated data
  const exercises = await Exercise.find(query)
    .populate("category")
    .sort({ createdAt: -1 }) // Latest first
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    exercises,
    pagination: {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    },
  };
};

export const getExerciseByIdService = async (id) => {
  const data = await Exercise.findById(id).populate("category");
  return data;
};

export const getExercisesByCategoryService = async (
  categoryId,
  page,
  limit
) => {
  console.log("ghjk");

  const data = await Exercise.find({ category: categoryId })
    .populate("category")
    .sort({ createdAt: -1 }) // Latest first
    .skip((page - 1) * limit)
    .limit(limit);

  console.log(data);

  return {
    data,
    pagination: {
      total: data.length,
      page,
      totalPages: Math.ceil(data.length / limit),
      limit,
    },
  };
};

export const createExerciseService = async (input) => {
  exerciseCreateSchema.parse(input);

  const exists = await Exercise.findOne({ slug: input.slug });
  if (exists) {
    throw new Error("Exercise with this slug already exists.");
  }

  const images = [];

  // Upload multiple gallery images
  for (const img of input?.images || []) {
    const file = await img.file;
    const uploaded = await handleCloudinaryUpload(file, "exercises");
    images.push({
      url: uploaded.url,
      publicId: uploaded.publicId,
      type: img.type,
      altText: img.altText || uploaded.altText,
    });
  }

  let image;
  // Upload main image
  if (input?.image) {
    const file = await input?.image.file;
    const uploaded = await handleCloudinaryUpload(file, "exercises");
    image = {
      url: uploaded.url,
      publicId: uploaded.publicId,
      altText: input?.image?.altText || uploaded.altText,
    };
  }

  input.image = image;

  const data = await Exercise.create({ ...input, images });
  return data;
};

export const updateExerciseService = async (id, input) => {
  exerciseUpdateSchema.parse(input);

  const oldExercise = await Exercise.findById(id);
  if (!oldExercise) throw new Error("Exercise not found.");

  // ===== Handle Single Main Image =====
  if (input.image !== undefined) {
    // Case 1: New image upload
    if (input.image?.file) {
      // Delete old main image from Cloudinary
      if (oldExercise.image?.publicId) {
        await deleteCloudinaryImage(oldExercise.image.publicId);
      }

      // Upload new image
      const file = await input.image.file;
      const uploaded = await handleCloudinaryUpload(file, "exercises");
      input.image = {
        url: uploaded.url,
        publicId: uploaded.publicId,
        altText: input.image.altText || uploaded.altText
      };
    }

    // Case 2: Remove image
    else if (input.image === null) {
      if (oldExercise.image?.publicId) {
        await deleteCloudinaryImage(oldExercise.image.publicId);
      }
      input.image = null;
    }

    // Case 3: Keeping old image → do nothing
  }

  // ===== Handle Images Array =====
  if (input.images !== undefined) {
    const oldImages = oldExercise.images || [];
    const incomingImages = input.images || [];

    // Separate existing (keep) and new uploads
    const existingImages = incomingImages.filter((img) => img.url);  
    const newImages = incomingImages.filter((img) => img.file);

    // Find removed images
    const removedImages = oldImages.filter(
      (oldImg) => !existingImages.some((img) => img.url === oldImg.url)
    );

    // Delete removed images from Cloudinary
    for (const removed of removedImages) {
      if (removed.publicId) {
        await deleteCloudinaryImage(removed.publicId);
      }
    }

    // Start with kept images
    const finalImages = [...existingImages];

    // Upload new images
    for (const img of newImages) {
      const file = await img.file;
      const uploaded = await handleCloudinaryUpload(file, "exercises");
      finalImages.push({
        url: uploaded.url,
        publicId: uploaded.publicId,
        altText: img.altText || uploaded.altText
      });
    }

    input.images = finalImages;
  }

  // ===== Update Document =====
  const updatedExercise = await Exercise.findByIdAndUpdate(id, input, { new: true });
  return updatedExercise;
};


// export const createExerciseService = async (input, req) => {
//   exerciseCreateSchema.parse(input);

//   const exists = await Exercise.findOne({ slug: input.slug });
//   if (exists) {
//     throw new Error("Exercise with this slug already exists.");
//   }
//   const BASE_URL = getBaseUrl(req);
//   const images = [];

//   for (const img of input?.images || []) {
//     const file = await img.file;
//     console.log(path.join(process.cwd(), "src", "uploads", "exercises"));
//     const uploaded = await handleImageUpload(
//       file,
//       path.join(process.cwd(), "src", "uploads", "exercises"),
//       BASE_URL,
//       "exercises"
//     );
//     images.push({ ...uploaded, type: img.type });
//   }

//   let image;
//   // for image
//   if (input?.image) {
//     const file = await input?.image.file;
//     const uploaded = await handleImageUpload(
//       file,
//       path.join(process.cwd(), "src", "uploads", "exercises"),
//       BASE_URL,
//       "exercises"
//     );
//     image = { ...uploaded };
//   }

//   input.image = image;

//   const data = await Exercise.create({ ...input, images });
//   return data;
// };

// export const updateExerciseService = async (id, input, req) => {
//   exerciseUpdateSchema.parse(input);
//   console.log("input", input, "");

//   const oldExercise = await Exercise.findById(id);
//   if (!oldExercise) throw new Error("Exercise not found.");

//   const BASE_URL = getBaseUrl(req);

//   // Handle single image field
//   if (input.image !== undefined) {
//     // If new image is being uploaded
//     if (input.image?.file) {
//       // Delete old single image file if exists
//       if (oldExercise.image?.file) {
//         const oldFilePath = path.join(
//           process.cwd(),
//           "src",
//           "uploads",
//           "exercises",
//           oldExercise.image.file
//         );
//         if (fs.existsSync(oldFilePath)) {
//           fs.unlinkSync(oldFilePath);
//           console.log("Deleted old single image:", oldExercise.image.file);
//         }
//       }

//       // Upload new single image
//       try {
//         const file = await input.image.file;
//         const uploaded = await handleImageUpload(
//           file,
//           path.join(process.cwd(), "src", "uploads", "exercises"),
//           BASE_URL,
//           "exercises"
//         );
//         input.image = {
//           ...uploaded,
//           altText: input.image.altText || "",
//         };
//         console.log("Uploaded new single image:", uploaded.file);
//       } catch (error) {
//         console.error("Error uploading single image:", error);
//         throw new Error(`Failed to upload single image: ${error.message}`);
//       }
//     }
//     // If image is being removed (set to null/empty)
//     else if (
//       input.image === null ||
//       (input.image && !input.image.url && !input.image.file)
//     ) {
//       // Delete old single image file if exists
//       if (oldExercise.image?.file) {
//         const oldFilePath = path.join(
//           process.cwd(),
//           "src",
//           "uploads",
//           "exercises",
//           oldExercise.image.file
//         );
//         if (fs.existsSync(oldFilePath)) {
//           fs.unlinkSync(oldFilePath);
//           console.log("Deleted removed single image:", oldExercise.image.file);
//         }
//       }
//       input.image = null;
//     }
//     // If existing image URL is being kept, no changes needed
//   }

//   // Handle images array field
//   if (input.images !== undefined) {
//     const oldImages = oldExercise.images || [];
//     const incomingImages = input.images || [];

//     // Separate existing images (with URLs) and new images (with files)
//     const existingImages = incomingImages.filter((img) => img.url);
//     const newImages = incomingImages.filter((img) => img.file);

//     // Find images that were removed (exist in old but not in incoming existing)
//     const removedImages = oldImages.filter(
//       (oldImg) =>
//         !existingImages.some((existingImg) => existingImg.url === oldImg.url)
//     );

//     // Delete removed image files from filesystem
//     for (const removedImg of removedImages) {
//       if (removedImg.file) {
//         const filePath = path.join(
//           process.cwd(),
//           "src",
//           "uploads",
//           "exercises",
//           removedImg.file
//         );
//         if (fs.existsSync(filePath)) {
//           fs.unlinkSync(filePath);
//           console.log("Deleted removed image from array:", removedImg.file);
//         }
//       }
//     }

//     // Start with existing images (these are kept)
//     const finalImages = [...existingImages];

//     // Upload and add new images
//     for (const newImg of newImages) {
//       try {
//         const file = await newImg.file;
//         const uploaded = await handleImageUpload(
//           file,
//           path.join(process.cwd(), "src", "uploads", "exercises"),
//           BASE_URL,
//           "exercises"
//         );
//         finalImages.push({
//           ...uploaded,
//           altText: newImg.altText || "",
//         });
//         console.log("Uploaded new image to array:", uploaded.file);
//       } catch (error) {
//         console.error("Error uploading image to array:", error);
//         throw new Error(`Failed to upload image: ${error.message}`);
//       }
//     }

//     // Update input with final images array
//     input.images = finalImages;
//   }

//   const data = await Exercise.findByIdAndUpdate(id, input, { new: true });
//   return data;
// };

// export const deleteExerciseService = async (id) => {
//   const exercise = await Exercise.findById(id);
//   if (!exercise) throw new Error("Exercise not found.");

//   // Delete associated image files
//   for (const img of exercise.images || []) {
//     const filePath = path.join(
//       process.cwd(),
//       "src",
//       "uploads",
//       "exercises",
//       img.file
//     );
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//   }
//   // Delete exercise
//   const data = await Exercise.findByIdAndDelete(id);
//   return data;
// };

export const deleteExerciseService = async (id) => {
  const exercise = await Exercise.findById(id);
  if (!exercise) throw new Error("Exercise not found.");

  // ===== Delete Main Image from Cloudinary =====
  if (exercise.image?.publicId) {
    await deleteCloudinaryImage(exercise.image.publicId);
  }

  // ===== Delete Gallery Images from Cloudinary =====
  for (const img of exercise.images || []) {
    if (img.publicId) {
      await deleteCloudinaryImage(img.publicId);
    }
  }

  // ===== Delete Exercise from DB =====
  const deleted = await Exercise.findByIdAndDelete(id);
  return deleted;
};

