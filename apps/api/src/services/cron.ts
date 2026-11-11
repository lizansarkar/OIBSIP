import cron from "node-cron";
import { Ingredient } from "../models/Ingredient.js";
import { sendLowStockAlert } from "./mailer.js";
import { ENV } from "../config/env.js";

// Cache recently alerted ingredient IDs to avoid repeated spam (1 hour debounce)
const recentAlerts = new Map<string, number>();

export async function checkLowStockAndAlert() {
  try {
    const lowStockItems = await Ingredient.find({
      $expr: { $lte: ["$currentStock", "$threshold"] },
    });

    if (lowStockItems.length === 0) {
      return;
    }

    const now = Date.now();
    const itemsToNotify = lowStockItems.filter((item) => {
      const lastSent = recentAlerts.get(item._id.toString()) || 0;
      return now - lastSent > 60 * 60 * 1000; // Only alert once per hour
    });

    if (itemsToNotify.length > 0) {
      console.log(
        `[Cron Alert] Detected ${itemsToNotify.length} low-stock ingredients. Dispatching email to ${ENV.ADMIN_EMAIL}`
      );
      await sendLowStockAlert(itemsToNotify);

      for (const item of itemsToNotify) {
        recentAlerts.set(item._id.toString(), now);
      }
    }
  } catch (error) {
    console.warn(
      "[Cron Error] Could not query inventory for low stock alerts:",
      error instanceof Error ? error.message : error
    );
  }
}

export function initCronJobs() {
  // Run inventory check every hour ('0 * * * *') or every 10 mins in dev
  const scheduleExpr = ENV.NODE_ENV === "production" ? "0 * * * *" : "*/10 * * * *";
  
  cron.schedule(scheduleExpr, async () => {
    console.log("[Node-Cron] Running scheduled inventory low-stock check...");
    await checkLowStockAndAlert();
  });

  console.log(`[Node-Cron] Scheduled low-stock inventory scanner (${scheduleExpr})`);
}
