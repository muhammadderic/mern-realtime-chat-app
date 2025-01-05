import express from "express";
const router = express.Router();

import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import messageRoutes from "./messageRoutes.js";

// API Routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/messages", messageRoutes);

// 404 Handling
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: {
      statusCode: 404,
      path: req.originalUrl,
      method: req.method,
    },
  });
});

export default router;