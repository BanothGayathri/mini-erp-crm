"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const customerController_1 = require("../controllers/customerController");
const validation_1 = require("../middleware/validation");
const checkValidation_1 = require("../middleware/checkValidation");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
// Add Customer
router.post("/", authMiddleware_1.verifyToken, roleMiddleware_1.isEmployeeOrAdmin, validation_1.customerValidation, checkValidation_1.checkValidation, customerController_1.addCustomer);
// Get All Customers
router.get("/", authMiddleware_1.verifyToken, customerController_1.getCustomers);
// Search Customer
router.get("/search", authMiddleware_1.verifyToken, customerController_1.searchCustomers);
// Customer Pagination
router.get("/pagination", authMiddleware_1.verifyToken, customerController_1.getCustomersPagination);
exports.default = router;
