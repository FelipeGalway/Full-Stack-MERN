import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import { recordSchema, partialSchema } from "../validation/recordSchema.mjs";

const router = express.Router();

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
  const { error } = recordSchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const collection = await db.collection("records");
  const result = await collection.insertOne(req.body);

  res.status(201).send(result);
});

router.patch("/:id", async (req, res) => {
  const { error } = partialSchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const query = { _id: new ObjectId(req.params.id) };
  const updates = { $set: req.body };

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
