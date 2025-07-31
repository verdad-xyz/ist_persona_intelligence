import express from "express";
import { getMe, Login, LogOut } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/getMe", getMe);
router.post("/login", Login);
router.delete("/logOut", LogOut);

export default router;
