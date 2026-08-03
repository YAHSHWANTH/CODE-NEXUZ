import User from "../models/userModel.js";

// ✅ Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// ✅ Create new user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};
