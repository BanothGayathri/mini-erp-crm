import express from "express";
import { verifyToken } from "../middleware/authMiddleware";

import {
  createChallan,
  getChallans,
  confirmChallan,
  cancelChallan,
} from "../controllers/challanController";

const router = express.Router();

router.post("/", verifyToken, createChallan);

router.get("/", verifyToken, getChallans);

router.put("/confirm/:id", verifyToken, confirmChallan);

router.put("/cancel/:id", verifyToken, cancelChallan);

export default router;