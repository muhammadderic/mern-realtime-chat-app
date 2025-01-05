import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"
import { app, server } from "./socket/socket.js";

import routes from "./routes/index.js";

dotenv.config();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json()); // To parse JSON body
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded body
app.use(cookieParser());

// Route
app.use('/api/v1', routes);

// JSON parser error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format",
      error: err.message,
    });
  }
  next(err);
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  // Connect to MongoDB
  connectDB();
  console.log(`Server running on port ${PORT}`);
});