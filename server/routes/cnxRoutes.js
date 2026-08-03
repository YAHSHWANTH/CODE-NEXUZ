import express from "express";
import CNX from "../models/cnxModel.js";
import QRCode from "qrcode";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common QR Code URL (verify page)
const VERIFY_URL = `${process.env.FRONTEND_URL || "https://codenexusz-gamma.vercel.app"}/verify`;
const QR_DIR = path.join(__dirname, "../public/qrs");
const COMMON_QR_PATH = path.join(QR_DIR, "commonQR.png");

// Generate & save common QR once
if (!fs.existsSync(COMMON_QR_PATH)) {
  QRCode.toFile(COMMON_QR_PATH, VERIFY_URL, (err) => {
    if (err) console.error("Error creating common QR:", err);
    else console.log("✅ Common QR generated successfully");
  });
}

router.post("/generate", async (req, res) => {
  try {
    const { name, email, course } = req.body;

    const cnxId = "CNX-" + Math.floor(100000 + Math.random() * 900000);

    const newEntry = new CNX({ cnxId, name, email, course });
    await newEntry.save();

    const qrPath = `/qrs/commonQR.png`; // Always same QR

    res.json({
      success: true,
      message: "CNX ID generated successfully",
      data: { cnxId, qrCode: qrPath },
    });
  } catch (err) {
    console.error("Error generating CNX ID:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
