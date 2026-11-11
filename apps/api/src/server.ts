import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { ENV } from "./config/env.js";
import { connectDB, getDatabaseStatus } from "./config/db.js";
import { errorHandler } from "./middleware/error.js";
import type { ApiResponse, HealthStatus } from "@workspace/shared";

const app = express();

// Security Headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: [ENV.CLIENT_URL, "http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging
app.use(morgan(ENV.NODE_ENV === "production" ? "combined" : "dev"));

// Body & Cookie Parsers
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Global Rate Limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  message: {
    success: false,
    error: "Too many requests from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", generalLimiter);

// Health Check API
app.get("/api/health", (_req, res) => {
  const dbStatus = getDatabaseStatus();
  const healthData: HealthStatus = {
    status: dbStatus === "connected" ? "ok" : "degraded",
    uptime: Math.floor(process.uptime()),
    environment: ENV.NODE_ENV,
    database: dbStatus,
    timestamp: new Date().toISOString(),
  };

  const response: ApiResponse<HealthStatus> = {
    success: true,
    message: "CRUST & CO. Pizza API is active and operational.",
    data: healthData,
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(response);
});

// Root Ping
app.get("/", (_req, res) => {
  res.json({
    brand: "CRUST & CO. - Handcrafted Wood-Fired Pizza",
    version: "1.0.0",
    docs: "/api/health",
  });
});

// Error handling middleware
app.use(errorHandler);

// Start Server & Connect Database
export async function startServer() {
  await connectDB();
  return app.listen(ENV.PORT, () => {
    console.log(`===============================================`);
    console.log(`🍕 CRUST & CO. API Server Running`);
    console.log(`🚀 Port: ${ENV.PORT}`);
    console.log(`🌐 Mode: ${ENV.NODE_ENV}`);
    console.log(`🔗 Health Check: http://localhost:${ENV.PORT}/api/health`);
    console.log(`===============================================`);
  });
}

// Auto start if executed directly
if (process.env.NODE_ENV !== "test") {
  startServer().catch((err) => {
    console.error("Failed to start server:", err);
  });
}

export default app;
