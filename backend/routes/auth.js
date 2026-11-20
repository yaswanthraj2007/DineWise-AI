import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import requireAuth from "../middleware/auth.js";

const router = Router();

const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const publicUser = (u) => ({
  id: u.id,
  hotel: u.hotel_name,
  name: u.name,
  email: u.email,
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { hotel, name, email, password } = req.body;

    if (!hotel || !name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });

    const cleanEmail = email.trim().toLowerCase();

    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [cleanEmail]
    );
    if (existing.length)
      return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (hotel_name, name, email, password_hash) VALUES (?, ?, ?, ?)",
      [hotel.trim(), name.trim(), cleanEmail, passwordHash]
    );

    const user = {
      id: result.insertId,
      hotel_name: hotel.trim(),
      name: name.trim(),
      email: cleanEmail,
    };
    res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email.trim().toLowerCase(),
    ]);
    const user = rows[0];

    const ok = user && (await bcrypt.compare(password, user.password_hash));
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/auth/me  (protected)
router.get("/me", requireAuth, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
    req.user.id,
  ]);
  if (!rows[0]) return res.status(404).json({ message: "User not found" });
  res.json({ user: publicUser(rows[0]) });
});

export default router;