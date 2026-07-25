"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
// Add Product
router.post("/", authMiddleware_1.verifyToken, productController_1.addProduct);
// Get Products (Pagination)
router.get("/", authMiddleware_1.verifyToken, productController_1.getProducts);
// Search Product
router.get("/search", authMiddleware_1.verifyToken, productController_1.searchProducts);
// Update Product
router.put("/:id", authMiddleware_1.verifyToken, productController_1.updateProduct);
// Delete Product
router.delete("/:id", authMiddleware_1.verifyToken, productController_1.deleteProduct);
exports.default = router;
