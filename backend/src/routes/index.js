import express from "express";
const router = express.Router();

import authRoutes from "./authRoutes.js";

// API Routes
router.use("/auth", authRoutes);

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