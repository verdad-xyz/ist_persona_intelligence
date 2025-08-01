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

router.get("/fraudnames", verifyUser, getFraudNames);
router.get("/fraudnames/:id", verifyUser, getFraudNameById);
router.patch("/fraudnames/:id", verifyUser, updateFraudName);
router.post("/fraudnames", verifyUser, createFraudName);
router.delete("/fraudnames/:id", verifyUser, deleteFraudName);

router.get("/fraudcategories", verifyUser, getFraudCategories);
router.get("/fraudcategories/:id", verifyUser, getFraudCategoryById);
router.patch("/fraudcategories/:id", verifyUser, updateFraudCategory);
router.post("/fraudcategories", verifyUser, createFraudCategory);
router.delete("/fraudcategories/:id", verifyUser, deleteFraudCategory);

export default router;
