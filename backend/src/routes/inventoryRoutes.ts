import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  getInventory,
  updateStock,
} from "../controllers/inventoryController";

const router = express.Router();

router.get("/", verifyToken, getInventory);
router.post("/update", verifyToken, updateStock);

export default router;