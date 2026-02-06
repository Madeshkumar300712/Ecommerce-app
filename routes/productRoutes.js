import express from "express";
import upload from "../middleware/uploadMiddleware.js"; 
import {
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  protect,
  admin,
  upload.single("image"), // 👈 FINAL
  createProduct
);
router.delete("/:id", protect, admin, deleteProduct);
router.get("/test", (req, res) => {
  res.send("PRODUCT ROUTES WORK");
});



export default router;
