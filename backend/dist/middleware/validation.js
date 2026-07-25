"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.challanValidation = exports.productValidation = exports.customerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.customerValidation = [
    (0, express_validator_1.body)("customer_name")
        .notEmpty()
        .withMessage("Customer name is required"),
    (0, express_validator_1.body)("mobile")
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile number must be 10 digits"),
    (0, express_validator_1.body)("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email")
];
exports.productValidation = [
    (0, express_validator_1.body)("product_name")
        .notEmpty()
        .withMessage("Product name is required"),
    (0, express_validator_1.body)("unit_price")
        .isFloat({ min: 0 })
        .withMessage("Price cannot be negative"),
    (0, express_validator_1.body)("current_stock")
        .isInt({ min: 0 })
        .withMessage("Stock cannot be negative")
];
exports.challanValidation = [
    (0, express_validator_1.body)("customer_id")
        .notEmpty()
        .withMessage("Customer is required"),
    (0, express_validator_1.body)("products")
        .isArray({ min: 1 })
        .withMessage("Products required")
];
