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
  const { nome, cargo, nivel } = req.body;

  if (!nome || !cargo || !nivel) {
    return res.status(400).send({ error: "Todos os campos (nome, cargo e nivel) são obrigatórios." });
  }

  if (!allowedLevels.includes(nivel)) {
    return res.status(400).send({ error: `O nível deve ser um dos seguintes: ${allowedLevels.join(", ")}` });
  }

  const newDocument = { nome, cargo, nivel };
  const collection = await db.collection("records");
  const result = await collection.insertOne(newDocument);

  res.status(201).send(result);
});

router.patch("/:id", async (req, res) => {
  const { nome, cargo, nivel } = req.body;

  if (!nome && !cargo && !nivel) {
    return res.status(400).send({ error: "Informe ao menos um campo para atualizar." });
  }

  const allowedLevels = ["Júnior", "Pleno", "Sênior"];
  if (nivel && !allowedLevels.includes(nivel)) {
    return res.status(400).send({ error: `O nível deve ser um dos seguintes: ${allowedLevels.join(", ")}` });
  }

  const query = { _id: new ObjectId(req.params.id) };
  const updates = { $set: {} };

  if (nome !== undefined) updates.$set.nome = nome;
  if (cargo !== undefined) updates.$set.cargo = cargo;
  if (nivel !== undefined) updates.$set.nivel = nivel;

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
