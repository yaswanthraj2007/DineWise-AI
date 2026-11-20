import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;

// Verify the DB connection before accepting requests
pool
  .query("SELECT 1")
  .then(() => {
    console.log("MySQL connected");
    app.listen(port, () => console.log(`API running on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error("MySQL connection failed:", err.message);
    process.exit(1);
  });