import express from "express";
import admin from "../middleware/adminMiddleware.js";
import {
  createOrder,
  getAllOrders,
  markOrderDelivered,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getOrderById } from "../controllers/orderController.js";
import { getMyOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.get("/", protect, admin, getAllOrders);
router.put("/:id/deliver", protect, admin, markOrderDelivered);

export default router;
