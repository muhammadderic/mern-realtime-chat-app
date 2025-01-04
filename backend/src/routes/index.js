import express from "express";
const router = express.Router();

import initialRoutes from "./initialRoutes.js";

// API Routes
router.use('/', initialRoutes);

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