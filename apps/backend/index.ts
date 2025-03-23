import { TrainModelSchema } from "common/types";
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

app.post("/ai/generate", (req, res) => {});

app.post("/pack/generate", (req, res) => {});

app.get("/pack/bulk", (req, res) => {});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
