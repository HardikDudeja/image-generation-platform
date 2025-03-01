import { z } from "zod";

export const TrainModelSchema = z.object({
  name: z.string(),
  type: z.enum(["Man", "Woman", "Other"]),
  age: z.number(),
  ethnicity: z.enum([
    "Asian",
    "Black",
    "Hispanic",
    "Indian",
    "Middle Eastern",
    "Native American",
    "Pacific Islander",
    "White",
    "Other",
  ]),
  eyeColor: z.enum(["Brown", "Blue", "Green", "Hazel", "Gray", "Other"]),
  bald: z.boolean(),
  images: z.array(z.string()),
});

export const GenerateImageSchema = z.object({
  prompt: z.string(),
  modelId: z.string(),
  n: z.number(),
});

export const GenerateImageFromPackSchema = z.object({
  modelId: z.string(),
  packId: z.string(),
});
