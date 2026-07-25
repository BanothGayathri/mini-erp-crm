"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const inventoryController_1 = require("../controllers/inventoryController");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.verifyToken, inventoryController_1.getInventory);
router.post("/update", authMiddleware_1.verifyToken, inventoryController_1.updateStock);
exports.default = router;
