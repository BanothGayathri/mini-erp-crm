import express from "express";
import { verifyToken } from "../middleware/authMiddleware";

import {
  addProduct,
  getProducts,
  searchProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = express.Router();

// Add Product
router.post("/", verifyToken, addProduct);

// Get Products (Pagination)
router.get("/", verifyToken, getProducts);

// Search Product
router.get("/search", verifyToken, searchProducts);

// Update Product
router.put("/:id", verifyToken, updateProduct);

// Delete Product
router.delete("/:id", verifyToken, deleteProduct);

export default router;