
// --------------------- server.js ---------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";

// Models
import User from "./models/userModel.js";
import Certificate from "./models/certificateModel.js";
import Enrollment from "./models/enrollModel.js"; // ✅ Added to fetch enrollments

// Routes
import enrollRoutes from "./routes/enrollRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js"; // ✅ Added for certificate routes

dotenv.config();
const app = express();

// --------------------- MIDDLEWARE ---------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// --------------------- PATH HELPERS ---------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------- MONGODB CONNECTION ---------------------
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --------------------- OTP STORE ---------------------
const otps = {};

// --------------------- SEND OTP ---------------------
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[email] = otp;

  // Log OTP immediately to console so that local developers can proceed even if SMTP fails
  console.log(`🔑 [DEV MODE] Generated OTP for ${email}: ${otp}`);

  try {
    console.log("📨 Attempting to send OTP via Nodemailer SMTP...");
    
    // Clean spaces from SMTP_PASS
    const rawPass = process.env.SMTP_PASS || "nklf cocg qjeo lher";
    const cleanPass = rawPass.replace(/\s+/g, "");
    
    const smtpUser = process.env.SMTP_USER || "codenexus032@gmail.com";

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: cleanPass,
      },
    });

    await transporter.sendMail({
      from: `"Code Nexus" <${smtpUser}>`,
      to: email,
      subject: "Your OTP Code - Code Nexus",
      text: `Your OTP for Code Nexus is: ${otp}`,
    });

    console.log(`✅ OTP sent successfully to ${email} via SMTP`);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ Email Sending Error:", err);
    res.status(500).json({ 
      success: false, 
      message: `Failed to deliver OTP: ${err.message || err}. Please ensure SMTP ports are not blocked on your server host.`
    });
  }
});

// --------------------- VERIFY OTP ---------------------
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otps[email] && otps[email] === otp) {
    delete otps[email];
    return res.json({ success: true, message: "OTP verified successfully" });
  }
  res.status(400).json({ success: false, message: "Invalid or expired OTP" });
});

// --------------------- SIGNUP ---------------------
app.post("/signup", async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";

    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
      isVerified: true,
    });

    await newUser.save();
    console.log(`✅ New ${role} registered: ${email}`);
    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

// --------------------- LOGIN ---------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🟢 Login attempt:", email);

  try {
    // Admin login
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      console.log("✅ Admin login successful");
      return res.json({
        success: true,
        message: "Admin login successful",
        token,
        role: "admin",
      });
    }

    // User login
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("✅ User login successful:", user.email);
    res.json({
      success: true,
      message: "User login successful",
      token,
      role: user.role,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// --------------------- ENROLLMENT ROUTES ---------------------
app.use("/api/enroll", enrollRoutes);
app.use("/api/certificates", certificateRoutes); // ✅ Added for fetching enrollments

// --------------------- ADMIN DASHBOARD ROUTES ---------------------

// ✅ Fetch all users (except admin)
app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error("❌ Fetch Users Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

// ✅ Fetch all enrollments
app.get("/api/admin/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enrollments });
  } catch (err) {
    console.error("❌ Fetch Enrollments Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch enrollments" });
  }
});

// ✅ Update enrollment status
app.put("/api/admin/enrollments/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Enrollment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ Update Enrollment Status Error:", err);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
});

// ✅ Fetch all certificates
app.get("/api/admin/certificates", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: certificates });
  } catch (err) {
    console.error("❌ Fetch Certificates Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch certificates" });
  }
});

// ✅ Generate new certificate
app.post("/api/admin/generate-certificate", async (req, res) => {
  try {
    const certData = req.body;
    const cert = new Certificate(certData);
    await cert.save();
    console.log("✅ Certificate generated:", certData);
    res.json({
      success: true,
      message: "Certificate generated successfully",
      data: cert,
    });
  } catch (err) {
    console.error("❌ Certificate Generation Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate certificate" });
  }
});

// ✅ QR Code generation route
app.get("/api/admin/generate-qr/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // 🔗 Replace with your actual deployed frontend verify page
    const verifyUrl = `${process.env.FRONTEND_URL || "https://codenexuszz.vercel.app"}/verify`;

    const qrImageData = await QRCode.toDataURL(verifyUrl);

    res.json({
      success: true,
      qr: qrImageData,
      link: verifyUrl,
    });
  } catch (err) {
    console.error("❌ QR Generation Error:", err);
    res.status(500).json({ success: false, message: "Failed to generate QR" });
  }
});
// --------------------- VERIFY CERTIFICATE (GET) ---------------------
app.get("/api/verify/:uniqueId", async (req, res) => {
  try {
    const { uniqueId } = req.params; // ✅ get from URL params

    if (!uniqueId)
      return res.status(400).json({ success: false, message: "Certificate ID required" });

    const certificate = await Certificate.findOne({ uniqueId });
    if (!certificate)
      return res.status(404).json({ success: false, message: "Certificate not found" });

    res.json({
      success: true,
      message: "Certificate verified successfully",
      certificate,
    });
  } catch (err) {
    console.error("❌ Verification Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// debug endpoint
app.get("/api/debug-env", (req, res) => {
  res.json({
    has_brevo_key: !!process.env.BREVO_API_KEY,
    has_resend_key: !!process.env.RESEND_API_KEY,
    has_smtp_user: !!process.env.SMTP_USER,
    has_smtp_pass: !!process.env.SMTP_PASS,
    smtp_user: process.env.SMTP_USER,
    node_env: process.env.NODE_ENV
  });
});

// --------------------- SERVER START ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//