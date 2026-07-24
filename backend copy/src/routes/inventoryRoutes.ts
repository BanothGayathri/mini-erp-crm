import express from "express";
import {
  stockIn,
  stockOut,
  getStockHistory
} from "../controllers/inventoryController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory Management
 */

/**
 * @swagger
 * /api/inventory/in:
 *   post:
 *     summary: Stock In
 *     tags: [Inventory]
 *     responses:
 *       201:
 *         description: Stock Added Successfully
 */
router.post("/in", stockIn);

/**
 * @swagger
 * /api/inventory/out:
 *   post:
 *     summary: Stock Out
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Stock Removed Successfully
 */
router.post("/out", stockOut);

/**
 * @swagger
 * /api/inventory/history:
 *   get:
 *     summary: Stock History
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Stock History
 */
router.get("/history", getStockHistory);

export default router;
import {
  isAdmin,
  isEmployeeOrAdmin
} from "../middleware/roleMiddleware";