// server/routes/authRoutes.js
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";


dotenv.config();

const router = express.Router();

// ✅ Combined Login for Admin & User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🧠 Admin Login Check (from .env)
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      return res.json({
        success: true,
        message: "Admin login successful",
        token,
        role: "admin",
      });
    }

    // 👤 Normal User Login (from DB)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // 🧩 Compare password for normal user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      message: "User login successful",
      token,
      role: "user",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
