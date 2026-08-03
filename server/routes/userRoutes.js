import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";

const router = express.Router();

// ✅ Create a new user
router.post("/", createUser);

// ✅ Fetch all users for Admin Dashboard
router.get("/all", getUsers);

export default router;
