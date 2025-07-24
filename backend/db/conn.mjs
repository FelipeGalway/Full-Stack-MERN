import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let db;

try {
    const conn = await client.connect();
    db = conn.db("meuBanco");
} catch (e) {
    console.error("Erro ao conectar com MongoDB:", e);
    process.exit(1); 
}

export default db;
