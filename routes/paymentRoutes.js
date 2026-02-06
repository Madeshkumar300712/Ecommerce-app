import express from "express";
import {
  createStripePayment,
  confirmStripePayment,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";  

const router = express.Router();
router.post("/stripe/create", protect, createStripePayment);
router.post("/stripe/confirm", protect, confirmStripePayment);

export default router;