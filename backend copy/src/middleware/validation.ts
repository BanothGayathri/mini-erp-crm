import { body } from "express-validator";

export const customerValidation = [
  body("customer_name")
    .notEmpty()
    .withMessage("Customer name is required"),

  body("mobile")
    .isLength({ min:10, max:10 })
    .withMessage("Mobile number must be 10 digits"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email")
];


export const productValidation = [

  body("product_name")
    .notEmpty()
    .withMessage("Product name is required"),

  body("unit_price")
    .isFloat({ min:0 })
    .withMessage("Price cannot be negative"),

  body("current_stock")
    .isInt({ min:0 })
    .withMessage("Stock cannot be negative")

];


export const challanValidation = [

  body("customer_id")
    .notEmpty()
    .withMessage("Customer is required"),

  body("products")
    .isArray({ min:1 })
    .withMessage("Products required")

];