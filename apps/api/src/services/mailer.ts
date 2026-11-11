import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

let transporter: nodemailer.Transporter | null = null;

try {
  transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    secure: ENV.SMTP_PORT === 465,
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASSWORD,
    },
  });
} catch (error) {
  console.warn("[Mailer] SMTP credentials not set or invalid, mailer in fallback mode.");
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  if (!transporter || !ENV.SMTP_USER) {
    console.log(`[Email Simulation] To: ${to} | Subject: ${subject}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"CRUST & CO. Kitchen" <${ENV.ADMIN_EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log(`[Email Dispatched] Successfully sent email to ${to}`);
    return true;
  } catch (error) {
    console.error("[Mailer Error] Failed to send email:", error);
    return false;
  }
}

export async function sendLowStockAlert(
  lowItems: Array<{ name: string; currentStock: number; unit: string; threshold: number }>
) {
  const itemsHtml = lowItems
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>${item.name}</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; color: #E05252; font-weight: bold;">
        ${item.currentStock} ${item.unit}
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.threshold} ${item.unit}</td>
    </tr>
  `
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #191B18; color: #F7F5EF; padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
      <h2 style="color: #FF8A1F; margin-top: 0;">⚠️ Low Stock Inventory Alert - CRUST & CO.</h2>
      <p style="color: #AAAFA5; font-size: 14px;">The automated Node-Cron inventory scanner detected ingredients below safety stock levels:</p>
      <table style="width: 100%; border-collapse: collapse; text-align: left; margin: 16px 0; font-size: 13px;">
        <thead>
          <tr style="background: #22251F; color: #F7F5EF;">
            <th style="padding: 8px;">Ingredient</th>
            <th style="padding: 8px;">Stock Remaining</th>
            <th style="padding: 8px;">Threshold</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <p style="font-size: 12px; color: #AAAFA5;">Please log into the Admin Console to restock inventory.</p>
    </div>
  `;

  return sendEmail({
    to: ENV.ADMIN_EMAIL,
    subject: `⚠️ Low Stock Alert: ${lowItems.length} Ingredients Require Restock`,
    html,
  });
}
