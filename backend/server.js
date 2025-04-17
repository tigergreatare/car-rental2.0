const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./mysql"); // Make sure to have the mysql.js file for DB connection
const path   = require("path");
const multer = require("multer");

// configure multer to write into ./uploads
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, path.join(__dirname, "uploads")),
  filename:    (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON data
app.use("/", router);
// make /uploads publicly visible
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = 5000;

// Sample route to get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Sample route to get all cars
app.get("/cars", (req, res) => {
  db.query("SELECT * FROM cars", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result); // Send car data as JSON response
  });
});

// SIGNUP - Register a New User
router.post("/signup", async (req, res) => {
  const { full_name, email, password, phone, address } = req.body;

  if (!full_name || !email || !password || !phone || !address) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        return res.status(400).json({ error: "Email already registered." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      const query = "INSERT INTO users (full_name, email, password_hash, phone, address) VALUES (?, ?, ?, ?, ?)";
      db.query(query, [full_name, email, hashedPassword, phone, address], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// LOGIN - Authenticate User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Server error, please try again later." });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      // Check if the password column name matches your database (e.g., password_hash or just password)
      if (!user.password_hash) {
        console.error("Password column mismatch. Check your database structure.");
        return res.status(500).json({ error: "Internal error, please contact support." });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      res.json({ message: "Login successful", userId: user.user_id });
    });
  } catch (error) {
    console.error("Unexpected server error:", error);
    res.status(500).json({ error: "Unexpected error, please try again later." });
  }
});

module.exports = router;


// Route to get user profile by user_id
app.get("/profile/:user_id", (req, res) => {
  const userId = req.params.user_id;

  db.query("SELECT * FROM users WHERE user_id = ?", [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result[0]);
  });
});

// Route to update user profile
// Route to update user profile (now handles multipart/form-data)
app.put(
  "/profile/:user_id",
  upload.single("profile_picture"),      // ← multer middleware
  (req, res) => {
    const userId = req.params.user_id;

    // pick new upload if exists, otherwise keep old URL
    const picPath = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.profile_picture;

    // drop profile_picture from the body destructuring
    const { full_name, email, phone, address } = req.body;

    const updateQuery =
      "UPDATE users SET full_name = ?, email = ?, phone = ?, address = ?, profile_picture = ? WHERE user_id = ?";

    db.query(
      updateQuery,
      [full_name, email, phone, address, picPath, userId],  // ← use picPath here
      (err, updateResult) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        // Fetch and return the updated user record
        db.query(
          "SELECT * FROM users WHERE user_id = ?",
          [userId],
          (err, selectResult) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            if (selectResult.length === 0) {
              return res.status(404).json({ error: "User not found" });
            }
            res.json(selectResult[0]);
          }
        );
      }
    );
  }
);


// Route to delete user profile
app.delete("/profile/:user_id", (req, res) => {
  const userId = req.params.user_id;

  db.query("DELETE FROM users WHERE user_id = ?", [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
