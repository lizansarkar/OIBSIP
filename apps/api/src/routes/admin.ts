import { Router, type Request, type Response } from "express";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import { checkLowStockAndAlert } from "../services/cron.js";

export const adminRouter = Router();

// Admin Overview Metrics
adminRouter.get("/overview", authenticate, requireAdmin, (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      totalRevenue: 14892.5,
      totalOrders: 682,
      activeProducts: 10,
      lowStockCount: 2,
    },
  });
});

// Trigger low stock scan manually
adminRouter.post("/scan-stock", authenticate, requireAdmin, async (_req: Request, res: Response) => {
  try {
    await checkLowStockAndAlert();
    res.json({
      success: true,
      message: "Low stock inventory scanner completed successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to scan inventory." });
  }
});
