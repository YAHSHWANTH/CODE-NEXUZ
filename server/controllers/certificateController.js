// // controllers/certificateController.js
// import Certificate from "../models/certificateModel.js";

// export const createCertificate = async (req, res) => {
//   try {
//     const { fullName, email, phone, college, location, course, duration, mentor } = req.body;

//     if (!fullName || !email || !phone || !college || !course) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const certificate = await Certificate.create({
//       fullName,
//       email,
//       phone,
//       college,
//       location,
//       course,
//       duration,
//       mentor,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Certificate created successfully",
//       certId: certificate.uniqueId,
//       data: certificate,
//     });
//   } catch (err) {
//     console.error("❌ Error creating certificate:", err);
//     res.status(500).json({ success: false, message: "Server error while creating certificate" });
//   }
// };

// // ✅ Fetch all certificates for admin dashboard
// export const getAllCertificates = async (req, res) => {
//   try {
//     const certs = await Certificate.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: certs });
//   } catch (err) {
//     console.error("❌ Error fetching certificates:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch certificates" });
//   }
// };


// controllers/certificateController.js
import Certificate from "../models/certificateModel.js";

export const createCertificate = async (req, res) => {
  try {
    const { fullName, email, phone, college, location, course, duration, mentor } = req.body;

    if (!fullName || !email || !phone || !college || !course) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const certificate = await Certificate.create({
      fullName,
      email,
      phone,
      college,
      location,
      course,
      duration,
      mentor,
    });

    res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      certId: certificate.uniqueId,
      data: certificate,
    });
  } catch (err) {
    console.error("❌ Error creating certificate:", err);
    res.status(500).json({ success: false, message: "Server error while creating certificate" });
  }
};

export const getAllCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: certs });
  } catch (err) {
    console.error("❌ Error fetching certificates:", err);
    res.status(500).json({ success: false, message: "Failed to fetch certificates" });
  }
};
