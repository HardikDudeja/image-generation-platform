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
    "Middle_Eastern",
    "Native_American",
    "Pacific_Islander",
    "White",
    "Other",
  ]),
  eyeColor: z.enum([
    "Black",
    "Brown",
    "Blue",
    "Green",
    "Hazel",
    "Gray",
    "Other",
  ]),
  bald: z.boolean(),
  images: z.array(z.string()).min(1),
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
