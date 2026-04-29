import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataRouter from "./routes/dataRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", dataRouter);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;