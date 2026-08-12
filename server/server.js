
// --------------------- server.js ---------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
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
import Settings from "./models/settingsModel.js";

// Routes
import enrollRoutes from "./routes/enrollRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js"; // ✅ Added for certificate routes

dotenv.config();
const app = express();

// --------------------- MIDDLEWARE ---------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// --------------------- HEALTH CHECK / PING ---------------------
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// --------------------- PATH HELPERS ---------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------- ENROLLMENT MIGRATION ---------------------
const runEnrollmentMigration = async () => {
  try {
    const unmigratedCount = await Enrollment.countDocuments({
      $or: [
        { uniqueId: { $exists: false } },
        { uniqueId: null },
        { uniqueId: "" }
      ]
    });

    if (unmigratedCount === 0) {
      console.log("ℹ️ No unmigrated enrollments found.");
      return;
    }

    console.log(`🚀 Starting migration for ${unmigratedCount} enrollments...`);
    const enrollments = await Enrollment.find({
      $or: [
        { uniqueId: { $exists: false } },
        { uniqueId: null },
        { uniqueId: "" }
      ]
    });

    for (const enroll of enrollments) {
      const normalizedEmail = enroll.email.trim().toLowerCase();
      // Find matching certificate by email (case-insensitive)
      const matchedCert = await Certificate.findOne({
        email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") }
      });

      if (matchedCert && matchedCert.uniqueId) {
        enroll.uniqueId = matchedCert.uniqueId;
        await enroll.save();
        console.log(`✅ Matched & updated enrollment for ${enroll.email} with uniqueId ${matchedCert.uniqueId}`);
      } else {
        // Generate a new unique ID that does not collide in either collection
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let isUnique = false;
        let tempId = "";
        while (!isUnique) {
          let suffix = "";
          for (let i = 0; i < 4; i++) {
            suffix += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          tempId = `CNX${suffix}`;
          const [eExists, cExists] = await Promise.all([
            Enrollment.findOne({ uniqueId: tempId }),
            Certificate.findOne({ uniqueId: tempId })
          ]);
          if (!eExists && !cExists) {
            isUnique = true;
          }
        }
        enroll.uniqueId = tempId;
        await enroll.save();
        console.log(`✅ Generated new uniqueId ${tempId} for enrollment ${enroll.email}`);
      }
    }
    console.log("🎉 Enrollment migration completed successfully!");
  } catch (err) {
    console.error("❌ Enrollment migration failed:", err);
  }
};

// --------------------- MONGODB CONNECTION ---------------------
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test")
  .then(async () => {
    console.log("✅ MongoDB Connected Successfully");
    await runEnrollmentMigration();
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --------------------- OTP STORE & HISTORY ---------------------
const otps = {};
const otpRequestHistory = {};

// --------------------- SEND OTP ---------------------
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const cleanEmail = email.trim();

  // Rate Limiting Checks
  const now = Date.now();
  if (!otpRequestHistory[cleanEmail]) {
    otpRequestHistory[cleanEmail] = { lastRequestedAt: 0, hourlyRequests: [] };
  }

  const history = otpRequestHistory[cleanEmail];
  const timeSinceLast = now - history.lastRequestedAt;
  if (timeSinceLast < 60000) {
    const secondsLeft = Math.ceil((60000 - timeSinceLast) / 1000);
    return res.status(429).json({
      success: false,
      message: `Please wait ${secondsLeft} seconds before requesting another OTP.`
    });
  }

  // Hourly Limit Check (max 5 per hour)
  history.hourlyRequests = history.hourlyRequests.filter(t => now - t < 3600000);
  if (history.hourlyRequests.length >= 5) {
    return res.status(429).json({
      success: false,
      message: "You have exceeded the maximum of 5 OTP requests per hour. Please try again later."
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[cleanEmail] = otp;

  // Automatically clear OTP from memory after 5 minutes
  setTimeout(() => {
    if (otps[cleanEmail] === otp) {
      delete otps[cleanEmail];
      console.log(`⏰ OTP expired and cleared for ${cleanEmail}`);
    }
  }, 300000);

  // Log OTP immediately to console so that local developers can proceed even if SMTP fails
  console.log(`🔑 [DEV MODE] Generated OTP for ${cleanEmail}: ${otp}`);
  // Save successful request history
  history.lastRequestedAt = now;
  history.hourlyRequests.push(now);

  // Send response immediately for extreme speed
  res.json({ success: true, message: "OTP sent successfully" });

  // Send email asynchronously in the background
  (async () => {
    try {
      if (!process.env.BREVO_API_KEY) {
        console.error("❌ BREVO_API_KEY is not configured on the server environment.");
        return;
      }

      console.log("📨 Sending OTP via Brevo HTTP API (Asynchronously)...");
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          sender: {
            name: "KodNexuz",
            email: process.env.SMTP_USER || "kodnexustech@gmail.com"
          },
          to: [{ email: cleanEmail }],
          subject: "Your OTP Code - KodNexuz",
          htmlContent: `<p>Your OTP for KodNexuz is: <strong>${otp}</strong></p><p>This OTP expires in 5 minutes.</p>`
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Brevo API error details:", errorData);
      } else {
        console.log(`✅ OTP sent successfully to ${cleanEmail} via Brevo (Background)`);
      }
    } catch (backgroundErr) {
      console.error("❌ Background Email Sending Error:", backgroundErr);
    }
  })();
});

// --------------------- VERIFY OTP ---------------------
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required" });

  const cleanEmail = email.trim();
  const cleanOtp = otp.trim();

  if (otps[cleanEmail] && otps[cleanEmail] === cleanOtp) {
    delete otps[cleanEmail];
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
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const cleanEmail = email.trim();
  console.log("🟢 Login attempt:", cleanEmail);

  try {
    // Admin login
    if (cleanEmail === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
      const token = jwt.sign({ email: cleanEmail, role: "admin" }, process.env.JWT_SECRET, {
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
    const user = await User.findOne({ email: cleanEmail });
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

// ✅ Check if enrollment exists by email (Admin helper)
app.get("/api/admin/enrollments/check-email", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email parameter is required" });
  }
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const enrollment = await Enrollment.findOne({ email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") } });
    res.status(200).json({ success: true, exists: !!enrollment, enrollment });
  } catch (err) {
    console.error("❌ Check Enrollment Email Error:", err);
    res.status(500).json({ success: false, message: "Server error checking email" });
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

// ✅ Update certificate status
app.put("/api/admin/certificates/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Certificate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ Update Certificate Status Error:", err);
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

// ✅ Fetch global setting by key (Public)
app.get("/api/settings/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const setting = await Settings.findOne({ key });
    res.status(200).json({ success: true, value: setting ? setting.value : null });
  } catch (err) {
    console.error(`❌ Fetch Setting ${key} Error:`, err);
    res.status(500).json({ success: false, message: "Failed to fetch setting" });
  }
});

// ✅ Update global setting by key (Admin)
app.put("/api/admin/settings/:key", async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  try {
    const updated = await Settings.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error(`❌ Update Setting ${key} Error:`, err);
    res.status(500).json({ success: false, message: "Failed to update setting" });
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
    
    // Find the certificate to get its uniqueId
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    // Point to verify page with uniqueId query param
    const verifyUrl = "https://www.kodnexuz.in/verify";

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

    if (certificate.status !== "Approved") {
      return res.status(403).json({ success: false, message: "Certificate verification is pending approval." });
    }

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

// --------------------- SECURE RECORD DELETION ---------------------
const verifyDeletePassword = (req, res, next) => {
  const password = req.headers["x-delete-password"];
  if (password !== "Boyamma@109") {
    return res.status(403).json({ success: false, message: "Unauthorized: Invalid delete password." });
  }
  next();
};

// ✅ Delete a user
app.delete("/api/admin/users/:id", verifyDeletePassword, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ Delete User Error:", err);
    res.status(500).json({ success: false, message: "Server error deleting user" });
  }
});

// ✅ Delete an enrollment
app.delete("/api/admin/enrollments/:id", verifyDeletePassword, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Enrollment.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Enrollment not found" });
    res.status(200).json({ success: true, message: "Enrollment deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Enrollment Error:", err);
    res.status(500).json({ success: false, message: "Server error deleting enrollment" });
  }
});

// ✅ Delete a certificate
app.delete("/api/admin/certificates/:id", verifyDeletePassword, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Certificate.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Certificate not found" });
    res.status(200).json({ success: true, message: "Certificate deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Certificate Error:", err);
    res.status(500).json({ success: false, message: "Server error deleting certificate" });
  }
});

// --------------------- AI ADMIN AGENT ---------------------

// Helper function to send email via Brevo
const sendBrevoEmail = async (toEmail, subject, htmlContent) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        sender: {
          name: "KodNexuz",
          email: process.env.SMTP_USER || "kodnexustech@gmail.com"
        },
        to: [{ email: toEmail.trim() }],
        subject: subject,
        htmlContent: htmlContent
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Brevo sending failure details:", errorData);
      return false;
    }
    return true;
  } catch (err) {
    console.error("❌ sendBrevoEmail error:", err);
    return false;
  }
};

// POST agent chat route
app.post("/api/admin/agent/chat", async (req, res) => {
  try {
    const geminiKey = req.headers["x-gemini-key"] || process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return res.status(400).json({ success: false, message: "Google Gemini API Key is required" });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    // Load data from DB
    const users = await User.find({});
    const enrollments = await Enrollment.find({});
    const certificates = await Certificate.find({});

    // Minimize data payload to fit in tokens and preserve privacy
    const registeredContext = users.map(u => ({
      name: u.fullName || u.firstName || "User",
      email: u.email,
      createdAt: u.createdAt
    }));

    const enrolledContext = enrollments.map(e => ({
      name: e.name,
      email: e.email,
      course: e.domain,
      status: e.status,
      uniqueId: e.uniqueId,
      createdAt: e.createdAt
    }));

    const certificatesContext = certificates.map(c => ({
      name: c.fullName,
      email: c.email,
      course: c.course,
      uniqueId: c.uniqueId
    }));

    // System instruction prompt
    const systemInstruction = `
You are the AI Admin Co-Pilot for the KodNexuz dashboard.
Analyze the user's prompt based on the provided database context.
Respond ONLY in JSON format following this schema:
{
  "reply": "Your markdown-formatted natural language reply summarizing your analysis or what actions you drafted.",
  "actions": [
    {
      "type": "send_email",
      "to": "recipient email address",
      "subject": "email subject",
      "body": "email HTML body content (use simple styling and line breaks <br/>)"
    }
  ]
}

Available Data Context:
- Registered Users: ${JSON.stringify(registeredContext)}
- Enrolled Students: ${JSON.stringify(enrolledContext)}
- Issued Certificates: ${JSON.stringify(certificatesContext)}

Guidelines for Actions:
- If the user asks to "send mail to unregistered/non-enrolled students", identify users in the Registered list whose email is NOT in the Enrolled list.
- For each identifying non-enrolled user, create a "send_email" action with a personalized, friendly draft email encouraging them to complete their enrollment.
- If the prompt is analytical or queries data, summarize the findings in "reply" and set "actions" to an empty array [].
`;

    // Call Gemini API using native fetch
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(geminiKey)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${systemInstruction}\n\nUser prompt: "${prompt}"`
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("❌ Gemini API Error:", errText);
      return res.status(response.status).json({ success: false, message: "Gemini API failure: " + errText });
    }

    const geminiRes = await response.json();
    const rawText = geminiRes.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!rawText) {
      return res.status(500).json({ success: false, message: "No content returned from Gemini" });
    }

    // Parse the response from Gemini
    let agentResult;
    try {
      agentResult = JSON.parse(rawText);
    } catch (parseErr) {
      console.error("❌ JSON Parse error from Gemini:", rawText);
      return res.status(500).json({ success: false, message: "Failed to parse Agent JSON response" });
    }

    res.json({
      success: true,
      data: agentResult
    });

  } catch (err) {
    console.error("❌ AI Agent Chat Error:", err);
    res.status(500).json({ success: false, message: "Server error in AI Agent chat" });
  }
});

// POST agent execute route
app.post("/api/admin/agent/execute", async (req, res) => {
  try {
    const { actions } = req.body;
    if (!actions || !Array.isArray(actions)) {
      return res.status(400).json({ success: false, message: "Actions array is required" });
    }

    const results = [];
    for (const action of actions) {
      if (action.type === "send_email") {
        const sent = await sendBrevoEmail(action.to, action.subject, action.body);
        results.push({ to: action.to, type: "send_email", success: sent });
      } else {
        results.push({ type: action.type, success: false, message: "Unknown action type" });
      }
    }

    res.json({
      success: true,
      results
    });
  } catch (err) {
    console.error("❌ AI Agent Execution Error:", err);
    res.status(500).json({ success: false, message: "Server error in executing agent actions" });
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