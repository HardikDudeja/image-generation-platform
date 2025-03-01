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
  await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethnicity: parsedBody.data.ethnicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
    },
  });
});

app.post("/ai/generate", (req, res) => {});

app.post("/pack/generate", (req, res) => {});

app.get("/pack/bulk", (req, res) => {});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
