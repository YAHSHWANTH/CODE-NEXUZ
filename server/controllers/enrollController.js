// // controllers/enrollController.js
// import Enrollment from "../models/enrollModel.js";

// // ✅ Create a new enrollment
// export const createEnrollment = async (req, res) => {
//   try {
//     // Normalize acceptedTerms to boolean
//     const data = { ...req.body };
//     data.acceptedTerms = data.acceptedTerms === true || data.acceptedTerms === "true";

//     const requiredFields = [
//       "name",
//       "dob",
//       "email",
//       "gender",
//       "phone",
//       "college",
//       "qualification",
//       "year",
//       "domain",
//       "source",
//       "linkedin",
//       "telegram",
//       "instagram",
//       "referrals",
//       "acceptedTerms",
//     ];

//     // ✅ Check for missing required fields
//     const missingFields = requiredFields.filter(
//       (field) => data[field] === undefined || data[field] === "" || data[field] === null
//     );

//     if (missingFields.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: `❌ Missing required fields: ${missingFields.join(", ")}`,
//       });
//     }

//     // ✅ Save enrollment to database
//     const enrollment = new Enrollment(data);
//     await enrollment.save();

//     res.status(201).json({
//       success: true,
//       message: "✅ Enrollment submitted successfully!",
//       data: enrollment,
//     });
//   } catch (error) {
//     console.error("Enrollment Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "❌ Server error while submitting enrollment.",
//       error: error.message,
//     });
//   }
// };

// // ✅ Get all enrollments (for admin dashboard)
// export const getAllEnrollments = async (req, res) => {
//   try {
//     const enrollments = await Enrollment.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: enrollments });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "❌ Failed to fetch enrollments.",
//       error: error.message,
//     });
//   }
// };



// controllers/enrollController.js
import Enrollment from "../models/enrollModel.js";

// ✅ Create a new enrollment
export const createEnrollment = async (req, res) => {
  try {
    const data = { ...req.body };
    data.acceptedTerms = data.acceptedTerms === true || data.acceptedTerms === "true";

    const requiredFields = [
      "name",
      "dob",
      "email",
      "gender",
      "phone",
      "college",
      "qualification",
      "year",
      "domain",
      "source",
      "linkedin",
      "telegram",
      "instagram",
      "referrals",
      "acceptedTerms",
    ];

    const missingFields = requiredFields.filter(
      (field) => data[field] === undefined || data[field] === "" || data[field] === null
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `❌ Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const enrollment = new Enrollment(data);
    await enrollment.save();

    res.status(201).json({
      success: true,
      message: "✅ Enrollment submitted successfully!",
      data: enrollment,
    });
  } catch (error) {
    console.error("Enrollment Error:", error);
    res.status(500).json({
      success: false,
      message: "❌ Server error while submitting enrollment.",
      error: error.message,
    });
  }
};

// ✅ Get all enrollments (for admin dashboard)
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Failed to fetch enrollments.",
      error: error.message,
    });
  }
};
