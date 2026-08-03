// // models/enrollModel.js
// import mongoose from "mongoose";

// const enrollmentSchema = new mongoose.Schema(
//   {
//     cnxId: {
//       type: String,
//       unique: true,
//       required: true,
//       default: function () {
//         const random = Math.random().toString(36).substr(2, 5).toUpperCase();
//         const timestamp = Date.now().toString(36).toUpperCase();
//         return `CNX_${timestamp}_${random}`;
//       },
//     },
//     name: { type: String, required: true },
//     dob: { type: String, required: true },
//     email: { type: String, required: true },
//     gender: { type: String, required: true },
//     phone: { type: String, required: true },
//     college: { type: String, required: true },
//     qualification: { type: String, required: true },
//     year: { type: String, required: true },
//     domain: { type: String, required: true },
//     source: { type: String, required: true },
//     linkedin: { type: String, required: true },
//     telegram: { type: String, required: true },
//     instagram: { type: String, required: true },
//     referrals: { type: String, required: true },
//     acceptedTerms: { type: Boolean, required: true },
//   },
//   { timestamps: true }
// );

// const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
// export default Enrollment;


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
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
