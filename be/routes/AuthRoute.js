import express from "express";
import { getMe, Login, LogOut } from "../controllers/AuthController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autentikasi pengguna
 */

/**
 * @swagger
 * /getMe:
 *   get:
 *     summary: Ambil informasi user yang sedang login
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Informasi user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Belum login
 *       400:
 *         description: User tidak ditemukan
 */
router.get("/getMe", getMe);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Email atau password salah
 */
router.post("/login", Login);

/**
 * @swagger
 * /logOut:
 *   delete:
 *     summary: Logout pengguna
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout berhasil
 *       400:
 *         description: Gagal logout
 */
router.delete("/logOut", LogOut);

export default router;
