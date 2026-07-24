import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct
} from "../controllers/productController";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);

export default router;

router.put("/:id", updateProduct);
import {
  deleteProduct
} from "../controllers/productController";

router.delete("/:id", deleteProduct);
import {
  searchProducts
} from "../controllers/productController";

router.get("/search", searchProducts);
import {
  getProductsPagination
} from "../controllers/productController";

router.get("/pagination", getProductsPagination);
import {
  isAdmin,
  isEmployeeOrAdmin
} from "../middleware/roleMiddleware";