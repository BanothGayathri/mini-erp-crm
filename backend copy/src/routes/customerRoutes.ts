import express from "express";
import { verifyToken } from "../middleware/authMiddleware";

import {
  addCustomer,
  getCustomers,
  searchCustomers,
  getCustomersPagination
} from "../controllers/customerController";

import { customerValidation } from "../middleware/validation";
import { checkValidation } from "../middleware/checkValidation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer Management
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Add Customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_name:
 *                 type: string
 *               mobile:
 *                 type: string
 *               email:
 *                 type: string
 *               business_name:
 *                 type: string
 *               gst_number:
 *                 type: string
 *               customer_type:
 *                 type: string
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer Added Successfully
 */
router.post(
  "/",
  verifyToken,
  customerValidation,
  checkValidation,
  addCustomer
);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get All Customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of Customers
 */
router.get("/", verifyToken, getCustomers);

/**
 * @swagger
 * /api/customers/search:
 *   get:
 *     summary: Search Customer
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer Search Result
 */
router.get("/search", verifyToken, searchCustomers);

/**
 * @swagger
 * /api/customers/pagination:
 *   get:
 *     summary: Customer Pagination
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated Customers
 */
export default router;
import {
  isAdmin,
  isEmployeeOrAdmin
} from "../middleware/roleMiddleware";