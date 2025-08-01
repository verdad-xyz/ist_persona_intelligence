import express from "express";
import { uploadFile, askQuestion } from "../gemini/aiHandler.js";

const router = express.Router();

router.post("/upload", uploadFile);
router.post("/ask", askQuestion);

export default router;
