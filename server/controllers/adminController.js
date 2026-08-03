import User from "../models/userModel.js";
import { Parser } from "json2csv";

// Get all users (Admin dashboard)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    console.log("✅ Users fetched:", users.length);

    if (users.length === 0) {
      return res.status(200).json([]); // empty but successful
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err.message);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

// Export users as CSV
export const exportUsersCSV = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const parser = new Parser();
    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv");
    res.attachment("users.csv");
    res.send(csv);
  } catch (err) {
    console.error("❌ CSV export error:", err.message);
    res.status(500).json({ message: "Server error exporting CSV" });
  }
};
