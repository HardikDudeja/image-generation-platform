import { TrainModelSchema } from "common/types";
import { prismaClient } from "db";
import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

app.post("/ai/training", (req, res) => {});

app.post("/ai/generate", (req, res) => {});

app.post("/pack/generate", (req, res) => {});

app.get("/pack/bulk", (req, res) => {});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
