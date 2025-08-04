import express from "express";
import {
  getFraudNames,
  createFraudName,
  getFraudCategories,
  createFraudCategory,
  updateFraudName,
  deleteFraudName,
  getFraudCategoryById,
  updateFraudCategory,
  deleteFraudCategory,
  getFraudNameById,
} from "../controllers/FraudController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Fraud Names
 *     description: Manajemen nama fraud
 *   - name: Fraud Categories
 *     description: Manajemen kategori fraud
 */

/**
 * @swagger
 * /fraudnames:
 *   get:
 *     summary: Ambil semua fraud name
 *     tags: [Fraud Names]
 *     responses:
 *       200:
 *         description: Daftar fraud name berhasil diambil
 */
router.get("/fraudnames", verifyUser, getFraudNames);

/**
 * @swagger
 * /fraudnames/{id}:
 *   get:
 *     summary: Ambil fraud name berdasarkan ID
 *     tags: [Fraud Names]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fraud name ditemukan
 *       404:
 *         description: Fraud name tidak ditemukan
 */
router.get("/fraudnames/:id", verifyUser, getFraudNameById);

/**
 * @swagger
 * /fraudnames:
 *   post:
 *     summary: Tambah fraud name baru
 *     tags: [Fraud Names]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, userId, categoryIds]
 *             properties:
 *               name:
 *                 type: string
 *               userId:
 *                 type: integer
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Fraud name berhasil dibuat
 */
router.post("/fraudnames", verifyUser, createFraudName);

/**
 * @swagger
 * /fraudnames/{id}:
 *   put:
 *     summary: Update fraud name
 *     tags: [Fraud Names]
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
 *               userId:
 *                 type: integer
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Fraud name berhasil diperbarui
 *       404:
 *         description: Fraud name tidak ditemukan
 */
router.patch("/fraudnames/:id", verifyUser, updateFraudName);

/**
 * @swagger
 * /fraudnames/{id}:
 *   delete:
 *     summary: Hapus fraud name
 *     tags: [Fraud Names]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fraud name berhasil dihapus
 *       404:
 *         description: Fraud name tidak ditemukan
 */
router.delete("/fraudnames/:id", verifyUser, deleteFraudName);

/**
 * @swagger
 * /fraudcategories:
 *   get:
 *     summary: Ambil semua kategori fraud
 *     tags: [Fraud Categories]
 *     responses:
 *       200:
 *         description: Daftar kategori berhasil diambil
 */
router.get("/fraudcategories", verifyUser, getFraudCategories);

/**
 * @swagger
 * /fraudcategories/{id}:
 *   get:
 *     summary: Ambil kategori fraud berdasarkan ID
 *     tags: [Fraud Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kategori ditemukan
 *       404:
 *         description: Kategori tidak ditemukan
 */
router.get("/fraudcategories/:id", verifyUser, getFraudCategoryById);

/**
 * @swagger
 * /fraudcategories:
 *   post:
 *     summary: Tambah kategori fraud
 *     tags: [Fraud Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kategori berhasil ditambahkan
 */
router.post("/fraudcategories", verifyUser, createFraudCategory);

/**
 * @swagger
 * /fraudcategories/{id}:
 *   put:
 *     summary: Update kategori fraud
 *     tags: [Fraud Categories]
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
 *     responses:
 *       200:
 *         description: Kategori berhasil diperbarui
 *       404:
 *         description: Kategori tidak ditemukan
 */
router.patch("/fraudcategories/:id", verifyUser, updateFraudCategory);

/**
 * @swagger
 * /fraudcategories/{id}:
 *   delete:
 *     summary: Hapus kategori fraud
 *     tags: [Fraud Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 *       404:
 *         description: Kategori tidak ditemukan
 */
router.delete("/fraudcategories/:id", verifyUser, deleteFraudCategory);

export default router;
