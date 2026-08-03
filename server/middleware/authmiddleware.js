import User from "../models/userModel.js";
import { Parser } from "json2csv";

// Get all users (for admin dashboard)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
  }
};
