import express from "express";
import {
  getFraudNames,
  createFraudName,
  getFraudCategories,
  createFraudCategory,
  updateFraudName,
  deleteFraudName,
} from "../controllers/FraudController.js";

const router = express.Router();

router.get("/fraudnames", getFraudNames);
router.patch("/fraudnames/:id", updateFraudName);
router.post("/fraudnames", createFraudName);
router.delete("/fraudnames/:id", deleteFraudName);

router.get("/fraudcategories", getFraudCategories);
router.post("/fraudcategories", createFraudCategory);

export default router;
