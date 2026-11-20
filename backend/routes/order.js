import { Router } from "express";
import pool from "../db.js";
import requireAuth from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// GET /api/orders
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT orderid, tableno, items, price, status, ordertime FROM orders ORDER BY orderid DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/orders   { tableno, items, price }
router.post("/", async (req, res) => {
  try {
    const { tableno, items, price } = req.body;
    if (!tableno || !items || price === undefined || price === "")
      return res.status(400).json({ message: "Table, items and price are required" });

    const [result] = await pool.query(
      "INSERT INTO orders (tableno, items, price) VALUES (?, ?, ?)",
      [Number(tableno), JSON.stringify([String(items).trim()]), Number(price)]
    );
    const [rows] = await pool.query("SELECT * FROM orders WHERE orderid = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/orders/:id/status   order -> received -> billed
router.patch("/:id/status", async (req, res) => {
  try {
    await pool.query(
      `UPDATE orders
       SET status = CASE status
         WHEN 'order' THEN 'received'
         WHEN 'received' THEN 'billed'
         ELSE status END
       WHERE orderid = ?`,
      [req.params.id]
    );
    const [rows] = await pool.query("SELECT * FROM orders WHERE orderid = ?", [
      req.params.id,
    ]);
    if (!rows[0]) return res.status(404).json({ message: "Order not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/orders/:id/reorder   { items, price }  -> appends, adds to price
router.patch("/:id/reorder", async (req, res) => {
  try {
    const { items, price } = req.body;
    if (!items || price === undefined || price === "")
      return res.status(400).json({ message: "Items and price are required" });

    const [result] = await pool.query(
      `UPDATE orders
       SET items = JSON_ARRAY_APPEND(items, '$', ?), price = price + ?
       WHERE orderid = ? AND status <> 'billed'`,
      [String(items).trim(), Number(price), req.params.id]
    );
    if (!result.affectedRows)
      return res.status(400).json({ message: "Order not found or already billed" });

    const [rows] = await pool.query("SELECT * FROM orders WHERE orderid = ?", [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;