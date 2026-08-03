import express from "express";
import User from "../models/userModel.js";
import Enrollment from "../models/enrollModel.js";
import Certificate from "../models/certificateModel.js";

const router = express.Router();

// ---------------- USERS SECTION ----------------
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
});

// ---------------- ENROLLMENTS SECTION ----------------
router.get("/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enrollments });
  } catch (err) {
    console.error("Error fetching enrollments:", err);
    res.status(500).json({ success: false, message: "Error fetching enrollments" });
  }
});

// ---------------- CERTIFICATES SECTION ----------------
router.get("/certificates", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json({ success: true, data: certificates });
  } catch (err) {
    console.error("Error fetching certificates:", err);
    res.status(500).json({ success: false, message: "Error fetching certificates" });
  }
});

// ---------------- CREATE CERTIFICATE ----------------
router.post("/certificates", async (req, res) => {
  try {
    const { name, course, email, remarks } = req.body;
    if (!name || !course || !email)
      return res.status(400).json({ success: false, message: "All required fields must be filled" });

    const uniqueId = `CERT-${Date.now()}`;
    const newCert = new Certificate({ name, course, email, remarks, uniqueId });
    await newCert.save();

    res.json({ success: true, message: "Certificate generated successfully", data: newCert });
  } catch (err) {
    console.error("Error generating certificate:", err);
    res.status(500).json({ success: false, message: "Error creating certificate" });
  }
});

export default router;
