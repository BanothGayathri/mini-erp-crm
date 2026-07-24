import express from "express";
import { verifyToken } from "../middleware/authMiddleware";

import {
  addCustomer,
  getCustomers,
  searchCustomers,
  getCustomersPagination,
} from "../controllers/customerController";

import { customerValidation } from "../middleware/validation";
import { checkValidation } from "../middleware/checkValidation";
import { isAdmin, isEmployeeOrAdmin } from "../middleware/roleMiddleware";

const router = express.Router();

// Add Customer
router.post(
  "/",
  verifyToken,
  isEmployeeOrAdmin,
  customerValidation,
  checkValidation,
  addCustomer
);

// Get All Customers
router.get(
  "/",
  verifyToken,
  getCustomers
);

// Search Customer
router.get(
  "/search",
  verifyToken,
  searchCustomers
);

// Customer Pagination
router.get(
  "/pagination",
  verifyToken,
  getCustomersPagination
);

export default router;