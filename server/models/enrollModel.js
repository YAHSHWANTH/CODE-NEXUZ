// models/enrollModel.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    qualification: { type: String, required: true },
    year: { type: String, required: true },
    domain: { type: String, required: true },
    source: { type: String, required: true },
    linkedin: { type: String, required: true },
    telegram: { type: String, required: true },
    instagram: { type: String, required: true },
    referrals: { type: String, required: true },
    acceptedTerms: { type: Boolean, required: true },
    status: { type: String, default: "Pending" },
    uniqueId: { type: String, unique: true },
  },
  { timestamps: true }
);

// Pre-save hook to generate guaranteed unique ID across both collections
enrollmentSchema.pre("save", async function (next) {
  if (!this.uniqueId) {
    const Enrollment = this.constructor;
    const Certificate = mongoose.model("Certificate");
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
      }
    }
  }
  next();
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
