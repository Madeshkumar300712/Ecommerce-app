import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

console.log("✅ authRoutes.js loaded");

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});


router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;
