import { z } from "zod";

export const categoryCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(5, "Description must be at least 5 chars"),
  isActive: z.boolean().optional(),
  images: z
    .array(
      z.object({
        url: z.string().optional(), // for existing images
        file: z.any().optional(), // for new uploads
        type: z.enum(["icon", "banner", "thumbnail"]).optional(),
        altText: z.string().optional(),
      })
    )
    .optional(),
});

export const categoryUpdateSchema = categoryCreateSchema.partial();
