import { z } from "zod";

const optionalUrl = z
  .string()
  .optional()
  .refine((val) => !val || /^https?:\/\/.+/.test(val), {
    message: "Invalid URL",
  });

const imageObjectSchema = z.object({
  url: optionalUrl.or(z.literal("")),
  altText: z.string().optional(),
  // ⛔ Removed `.file` from here since it shouldn't be validated server-side
});

export const exerciseCreateSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  slug: z.string().min(1, "Slug is required"),

  category: z.string().min(1, "Category ID is required"),

  type: z.enum(["Compound", "Isolation", "Bodyweight"], {
    errorMap: () => ({
      message: "Invalid type. Must be one of: Compound, Isolation, Bodyweight",
    }),
  }),

  primaryMuscles: z
    .array(z.string())
    .min(1, "At least one primary muscle is required"),

  equipment: z
    .array(z.string())
    .min(1, "At least one equipment is required"),

  instructions: z
    .array(z.string())
    .min(1, "At least one instruction step is required"),

  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),

  image: imageObjectSchema.optional().nullable(),

  images: z.array(imageObjectSchema).optional().nullable(),

  videoUrl: optionalUrl.or(z.literal("")).or(z.null()),

  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const exerciseUpdateSchema = exerciseCreateSchema.partial();
