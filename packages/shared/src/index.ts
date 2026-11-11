import { z } from "zod";

// User & Auth Types
export const UserRole = {
  CUSTOMER: "customer",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// Order Status Workflow
export const OrderStatus = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

// Payment Status
export const PaymentStatus = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

// Ingredient Categories for Custom Pizza Builder
export const IngredientCategory = {
  BASE: "base",
  SAUCE: "sauce",
  CHEESE: "cheese",
  VEGETABLE: "vegetable",
  MEAT: "meat",
  TOPPING: "topping",
} as const;

export type IngredientCategory =
  (typeof IngredientCategory)[keyof typeof IngredientCategory];

// Pizza Size & Crust Definitions
export const PizzaSize = {
  SMALL: "10-inch Small",
  MEDIUM: "12-inch Medium",
  LARGE: "14-inch Large",
} as const;

export type PizzaSize = (typeof PizzaSize)[keyof typeof PizzaSize];

// Base API Response Format
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}

// Health Check Response
export interface HealthStatus {
  status: "ok" | "degraded" | "down";
  uptime: number;
  environment: string;
  database: "connected" | "disconnected" | "connecting";
  timestamp: string;
}

// Validation Schemas
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
