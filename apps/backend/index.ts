import {
  GenerateImageFromPackSchema,
  GenerateImageSchema,
  TrainModelSchema,
} from "common/types";
import { prismaClient } from "db";
import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post("/ai/training", async (req, res) => {
  const parsedBody = TrainModelSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      error: "Invalid request body",
      message: parsedBody,
    });
    return;
  }
  try {
    const { name, type, age, ethnicity, eyeColor, bald, userId } =
      parsedBody.data;
    const data = await prismaClient.model.create({
      data: { name, type, age, ethnicity, eyeColor, bald, userId },
    });
    res.status(200).json({ data: data, message: "Record created" });
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({
      error: "Server error",
      message: "Could not create record",
    });
  }
});

app.delete("/ai/models", async (req, res) => {
  try {
    await prismaClient.model.deleteMany();
    res.status(200).json({
      success: true,
      message: "All models deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

app.post("/ai/generate", async (req, res): Promise<any> => {
  try {
    const parsedBody = GenerateImageSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const { prompt, modelId } = parsedBody.data;
    const data = await prismaClient.outputImages.create({
      data: {
        prompt,
        modelId,
      },
    });
    res
      .status(200)
      .json({ imageId: data.id, message: "Generation request created" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/pack/generate", async (req, res) => {
  try {
    const parsedBody = GenerateImageFromPackSchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({ error: parsedBody.error });
      return;
    }
    const prompts = await prismaClient.packPrompts.findMany({
      where: {
        packId: parsedBody.data.packId,
      },
    });

    const images = await prismaClient.outputImages.createManyAndReturn({
      data: prompts.map((prompt) => ({
        prompt: prompt.prompt,
        modelId: parsedBody.data.modelId,
      })),
    });
    res.json({
      images,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/pack/bulk", async (req, res) => {
  try {
    const packs = await prismaClient.packs.findMany({
      include: {
        prompts: true,
      },
    });
    res.json({ packs });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/image/bulk", async (req, res) => {
  const images = req.query.images as string[];
  if (!images || !Array.isArray(images)) {
    res.status(400).json({ error: "Images array is required" });
    return;
  }
  try {
    const outputImages = await prismaClient.outputImages.findMany({
      where: {
        id: {
          in: images,
        },
      },
    });
    res.json({ images: outputImages });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
