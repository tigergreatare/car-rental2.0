const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

const router = express.Router();
const db = require("./db"); // Import the DB connection from another file
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// *Signup Route* (Generates JWT Token on Signup)
router.post("/signup", async (req, res) => {
  const { full_name, email, password, phone } = req.body;

  if (!full_name || !email || !password || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (full_name, email, password_hash, phone) VALUES (?, ?, ?, ?)";
    db.query(sql, [full_name, email, hashedPassword, phone], (err, result) => {
      if (err) {
        console.error("Database query error:", err); 
        return res.status(500).json({ error: err.message });
      }

      const userId = result.insertId;
      const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });

      res.json({ message: "User registered successfully!", token, userId });
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// *Login Route* (Generates JWT Token)
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, user });
  });
});

module.exports = router;