import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from apps/api or fallback to root .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/crust_and_co",
  JWT_SECRET: process.env.JWT_SECRET || "crust_and_co_super_secret_jwt_key_2026",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder_id",
  RAZORPAY_KEY_SECRET:
    process.env.RAZORPAY_KEY_SECRET || "rzp_test_placeholder_secret",
  SMTP_HOST: process.env.SMTP_HOST || "smtp.mailtrap.io",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "2525", 10),
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@crustandco.com",
  LOW_STOCK_THRESHOLD: parseInt(process.env.LOW_STOCK_THRESHOLD || "5", 10),
};
