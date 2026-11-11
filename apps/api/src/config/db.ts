import mongoose from "mongoose";
import { ENV } from "./env.js";

let isConnected = false;

export async function connectDB(): Promise<typeof mongoose | null> {
  if (isConnected) {
    return mongoose;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(
      `[MongoDB] Warning: Could not connect to MongoDB at ${ENV.MONGODB_URI}. API will run in resilient fallback mode for health checks. Error:`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

export function getDatabaseStatus(): "connected" | "disconnected" | "connecting" {
  switch (mongoose.connection.readyState) {
    case 1:
      return "connected";
    case 2:
      return "connecting";
    default:
      return "disconnected";
  }
}
