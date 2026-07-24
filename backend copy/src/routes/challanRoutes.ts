import express from "express";
import {
  createChallan,
  getChallans,
  confirmChallan,
  cancelChallan
} from "../controllers/challanController";

import {
  challanValidation
} from "../middleware/validation";

import {
  checkValidation
} from "../middleware/checkValidation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Challans
 *   description: Challan Management
 */

/**
 * @swagger
 * /api/challans:
 *   post:
 *     summary: Create Challan
 *     tags: [Challans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Challan Created Successfully
 */
router.post(
  "/",
  challanValidation,
  checkValidation,
  createChallan
);

/**
 * @swagger
 * /api/challans:
 *   get:
 *     summary: Get All Challans
 *     tags: [Challans]
 *     responses:
 *       200:
 *         description: Challan List
 */
router.get("/", getChallans);

/**
 * @swagger
 * /api/challans/{id}/confirm:
 *   put:
 *     summary: Confirm Challan
 *     tags: [Challans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Challan Confirmed Successfully
 */
router.put("/:id/confirm", confirmChallan);

/**
 * @swagger
 * /api/challans/{id}/cancel:
 *   put:
 *     summary: Cancel Challan
 *     tags: [Challans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Challan Cancelled Successfully
 */
router.put("/:id/cancel", cancelChallan);

export default router;
import {
  isAdmin,
  isEmployeeOrAdmin
} from "../middleware/roleMiddleware";