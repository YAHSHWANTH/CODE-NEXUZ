router.get("/verify", async (req, res) => {
  try {
    const { uniqueId } = req.body;
    if (!uniqueId) return res.status(400).json({ message: "Certificate ID required" });

    const certificate = await Certificate.findOne({ uniqueId });
    if (!certificate) return res.status(404).json({ message: "Certificate not found" });

    res.json({
      success: true,
      message: "Certificate verified successfully",
      certificate,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// router.get("api/verify/:uniqueId", async (req, res) => {
//   try {
//     const { uniqueId } = req.params; // ✅ get from URL params

//     if (!uniqueId)
//       return res.status(400).json({ message: "Certificate ID required" });

//     const certificate = await Certificate.findOne({ uniqueId });
//     if (!certificate)
//       return res.status(404).json({ message: "Certificate not found" });

//     res.json({
//       success: true,
//       message: "Certificate verified successfully",
//       certificate,
//     });
//   } catch (error) {
//     console.error("Verification error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

