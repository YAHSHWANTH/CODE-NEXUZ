// models/certificateModel.js
import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      unique: true,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    location: { type: String, default: "" },
    course: { type: String, required: true },
    duration: { type: String, default: "" },
    mentor: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Approved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// Pre-save hook to adopt matching enrollment ID or generate a new unique one
certificateSchema.pre("save", async function (next) {
  const Enrollment = mongoose.model("Enrollment");
  const Certificate = this.constructor;

  // 1. If uniqueId is not provided, try to find a matching enrollment by email (case-insensitive)
  if (!this.uniqueId && this.email) {
    const normalizedEmail = this.email.trim().toLowerCase();
    const enrollment = await Enrollment.findOne({ email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") } });
    if (enrollment && enrollment.uniqueId) {
      this.uniqueId = enrollment.uniqueId;
      console.log(`🔗 Adopted enrollment uniqueId ${this.uniqueId} for certificate of ${this.email}`);
    }
  }

  // 2. If it still doesn't have a uniqueId, generate a new unique one
  if (!this.uniqueId) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let isUnique = false;
    while (!isUnique) {
      let suffix = "";
      for (let i = 0; i < 4; i++) {
        suffix += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const tempId = `CNX${suffix}`;
      const [eExists, cExists] = await Promise.all([
        Enrollment.findOne({ uniqueId: tempId }),
        Certificate.findOne({ uniqueId: tempId })
      ]);
      if (!eExists && !cExists) {
        this.uniqueId = tempId;
        isUnique = true;
        console.log(`✨ Generated new uniqueId ${this.uniqueId} for certificate of ${this.email}`);
      }
    }
  }
  next();
});

export default mongoose.model("Certificate", certificateSchema);
