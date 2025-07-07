import { z } from "zod";

export const exerciseCreateSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  slug: z.string().min(1),
  category: z.string().min(1, "Category ID is required"),
  type: z.enum(["Compound", "Isolation", "Bodyweight"]),
  primaryMuscles: z.array(z.string()).min(1, "At least one primary muscle is required"),
  secondaryMuscles: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  howTo: z.string().min(10, "How-to description is too short"),
  images: z
    .array(
      z.object({
        url: z.string().optional(),
        file: z.any().optional(),
        altText: z.string().optional(),
        type: z.enum(["thumbnail", "demo", "execution"]).optional(),
      })
    )
    .optional(),
});

export const exerciseUpdateSchema = exerciseCreateSchema.partial();
