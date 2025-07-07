import { z } from "zod";

export const muscleGroupCreateSchema = z.object({
  name: z.string().min(1, "Muscle group name is required"),
  slug: z.string().min(1),
  description: z.string().optional(),
  muscles: z.array(z.string()).optional(), // e.g., ["Lats", "Traps"]
});

export const muscleGroupUpdateSchema = muscleGroupCreateSchema.partial();
