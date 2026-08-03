// routes/certificateRoutes.js
import express from "express";
import { createCertificate, getAllCertificates } from "../controllers/certificateController.js";

const router = express.Router();

router.post("/create", createCertificate);
router.get("/all", getAllCertificates);

export default router;
