import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Manajemen anggota AFR (admin only)
 */

/**
 * @swagger
 * /users:
 *
 *   get:
 *     summary: Ambil semua user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Daftar user berhasil diambil
 */
router.get("/users", verifyUser, getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Ambil user berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user
 *     responses:
 *       200:
 *         description: Data user ditemukan
 *       404:
 *         description: User tidak ditemukan
 */
router.get("/users/:id", verifyUser, getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tambah user baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 */
router.post("/users", verifyUser, createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update data user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User berhasil diupdate
 *       404:
 *         description: User tidak ditemukan
 */
router.patch("/users/edit/:id", verifyUser, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Hapus user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       404:
 *         description: User tidak ditemukan
 */
router.delete("/users/:id", verifyUser, deleteUser);

export default router;
