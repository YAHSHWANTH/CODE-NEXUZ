// // models/certificateModel.js
// import mongoose from "mongoose";

// const certificateSchema = new mongoose.Schema(
//   {
//     uniqueId: {
//       type: String,
//       unique: true,
//       required: true,
//       default: function () {
//         const random = Math.random().toString(36).substr(2, 5).toUpperCase();
//         const timestamp = Date.now().toString(36).toUpperCase();
//         return `CNX_${timestamp}_${random}`;
//       },
//     },
//     fullName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     college: { type: String, required: true },
//     location: { type: String, default: "" },
//     course: { type: String, required: true },
//     duration: { type: String, default: "" },
//     mentor: { type: String, default: "" },
//     enrollmentRef: { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment", default: null },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Certificate", certificateSchema);



// models/certificateModel.js
import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      unique: true,
      required: true,
      default: function () {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let suffix = "";
        for (let i = 0; i < 4; i++) {
          suffix += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `CNX${suffix}`;
      },
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    location: { type: String, default: "" },
    course: { type: String, required: true },
    duration: { type: String, default: "" },
    mentor: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
