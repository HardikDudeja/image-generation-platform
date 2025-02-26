import { z } from "zod";

export const TrainModelSchema = z.object({
    name: z.string(),
    type: z.string(),
})