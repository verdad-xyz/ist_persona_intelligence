import express from "express";
import {
  getFraudNames,
  createFraudName,
  getFraudCategories,
  createFraudCategory,
} from "../controllers/FraudController.js";

const router = express.Router();

router.get("/fraudnames", getFraudNames);
router.post("/fraudnames", createFraudName);

router.get("/fraudcategories", getFraudCategories);
router.post("/fraudcategories", createFraudCategory);

export default router;
