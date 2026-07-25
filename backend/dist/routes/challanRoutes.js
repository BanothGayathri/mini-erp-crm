"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const challanController_1 = require("../controllers/challanController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.verifyToken, challanController_1.createChallan);
router.get("/", authMiddleware_1.verifyToken, challanController_1.getChallans);
router.put("/confirm/:id", authMiddleware_1.verifyToken, challanController_1.confirmChallan);
router.put("/cancel/:id", authMiddleware_1.verifyToken, challanController_1.cancelChallan);
exports.default = router;
