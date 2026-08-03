import express from "express";
import { createEnrollment, getAllEnrollments } from "../controllers/enrollController.js";

const router = express.Router();

// ✅ Create a new enrollment
router.post("/create", createEnrollment);

// ✅ Get all enrollments for admin dashboard
router.get("/all", getAllEnrollments);

export default router;

