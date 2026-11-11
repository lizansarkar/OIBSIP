import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { UserRole } from "@workspace/shared";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: UserRole;
  };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // Read token from secure HTTP-only cookie or Authorization Bearer header
  const token =
    req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Authentication required. Please sign in.",
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as {
      userId: string;
      email: string;
      role: UserRole;
    };
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired session. Please sign in again.",
      timestamp: new Date().toISOString(),
    });
  }
}

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user || req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({
      success: false,
      error: "Access denied. Administrator privileges required.",
      timestamp: new Date().toISOString(),
    });
  }
  next();
}
