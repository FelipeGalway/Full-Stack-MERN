import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import recordsRouter from "./routes/records.mjs"; 

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/records", recordsRouter); 

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
