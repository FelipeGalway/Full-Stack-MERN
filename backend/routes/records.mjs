import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

const allowedLevels = ["Júnior", "Pleno", "Sênior"];

router.get("/", async (req, res) => {
  const collection = await db.collection("records");
  const results = await collection.find({}).toArray();
  res.status(200).send(results);
});

router.get("/:id", async (req, res) => {
  const collection = await db.collection("records");
  const query = { _id: new ObjectId(req.params.id) };
  const result = await collection.findOne(query);

  if (!result) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(result);
});

router.post("/", async (req, res) => {
  const { name, position, level } = req.body;

  if (!name || !position || !level) {
    return res.status(400).send({ error: "Todos os campos (name, position e level) são obrigatórios." });
  }

  if (!allowedLevels.includes(level)) {
    return res.status(400).send({ error: `O nível deve ser um dos seguintes: ${allowedLevels.join(", ")}` });
  }

  const newDocument = { name, position, level };
  const collection = await db.collection("records");
  const result = await collection.insertOne(newDocument);

  res.status(201).send(result);
});

router.patch("/:id", async (req, res) => {
  const { name, position, level } = req.body;

  if (!name || !position || !level) {
    return res.status(400).send({ error: "Todos os campos são obrigatórios." });
  }

  if (!allowedLevels.includes(level)) {
    return res.status(400).send({ error: `O nível deve ser um dos seguintes: ${allowedLevels.join(", ")}` });
  }

  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: { name, position, level }
  };

  const collection = await db.collection("records");
  const result = await collection.updateOne(query, updates);

  res.status(200).send(result);
});

router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection = await db.collection("records");
  const result = await collection.deleteOne(query);

  res.status(200).send(result);
});

export default router;
