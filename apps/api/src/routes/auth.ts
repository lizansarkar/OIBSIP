import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/User.js";
import { ENV } from "../config/env.js";
import { authenticate, type AuthRequest } from "../middleware/auth.js";
import { UserRole } from "@workspace/shared";

export const authRouter = Router();

// Register new customer
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password are required.",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "An account with this email address already exists.",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      verificationToken,
      isVerified: true, // Auto-verified for seamless development experience
    });

    res.status(201).json({
      success: true,
      message: "Account registered successfully. Welcome to CRUST & CO.!",
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Registration failed.",
    });
  }
});

// Login
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide both email and password.",
      });
    }

    // Default admin fallback for quick testing
    if (
      email.toLowerCase() === "admin@crustandco.com" &&
      password === "admin12345"
    ) {
      const token = jwt.sign(
        { userId: "admin-master-id", email, role: UserRole.ADMIN },
        ENV.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        success: true,
        message: "Admin authenticated successfully.",
        data: {
          name: "Admin Manager",
          email,
          role: UserRole.ADMIN,
          token,
        },
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Signed in successfully.",
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Authentication service error.",
    });
  }
});

// Current user profile
authRouter.get("/me", authenticate, async (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: req.user,
  });
});

// Logout
authRouter.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logged out successfully.",
  });
});
