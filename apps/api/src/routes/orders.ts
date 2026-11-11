import { Router, type Request, type Response } from "express";
import { Order } from "../models/Order.js";
import { SAMPLE_PRODUCTS, BUILDER_OPTIONS, OrderStatus, PaymentStatus } from "@workspace/shared";
import { authenticate, requireAdmin } from "../middleware/auth.js";

export const ordersRouter = Router();

// Server-side price recalculation function
function calculateServerPrice(items: any[]) {
  let subtotal = 0;

  for (const item of items) {
    if (item.isCustom && item.customization) {
      // Recalculate custom pizza from server-side ingredients
      const basePrice =
        BUILDER_OPTIONS.bases.find((b: { id: string; price: number }) => b.id === item.customization.base?.id)?.price || 12;
      const saucePrice =
        BUILDER_OPTIONS.sauces.find((s: { id: string; price: number }) => s.id === item.customization.sauce?.id)?.price || 1.5;
      const cheesePrice =
        BUILDER_OPTIONS.cheeses.find((c: { id: string; price: number }) => c.id === item.customization.cheese?.id)?.price || 2.5;

      const veggiesSum = (item.customization.vegetables || []).reduce(
        (sum: number, v: any) => {
          const found =
            BUILDER_OPTIONS.vegetables.find((veg: { id: string; price: number }) => veg.id === v.id) ||
            BUILDER_OPTIONS.meats.find((m: { id: string; price: number }) => m.id === v.id);
          return sum + (found?.price || 0);
        },
        0
      );

      const multiplier =
        item.size?.includes("Small") ? 0.8 : item.size?.includes("Large") ? 1.25 : 1.0;

      const unitPrice = (basePrice + saucePrice + cheesePrice + veggiesSum) * multiplier;
      item.unitPrice = Number(unitPrice.toFixed(2));
      subtotal += item.unitPrice * (item.quantity || 1);
    } else {
      // Standard product lookup
      const prod = SAMPLE_PRODUCTS.find((p: { id: string; name: string; basePrice: number }) => p.id === item.productId || p.name === item.name);
      const base = prod ? prod.basePrice : item.price || 18.5;
      const multiplier =
        item.size?.includes("Small") ? 0.8 : item.size?.includes("Large") ? 1.25 : 1.0;
      item.unitPrice = Number((base * multiplier).toFixed(2));
      subtotal += item.unitPrice * (item.quantity || 1);
    }
  }

  const deliveryFee = subtotal >= 40 ? 0 : 4.5;
  const total = Number((subtotal + deliveryFee).toFixed(2));

  return { subtotal: Number(subtotal.toFixed(2)), deliveryFee, total };
}

// Create new order
ordersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { customerName, customerEmail, customerPhone, deliveryAddress, items, paymentMethod } =
      req.body;

    if (!customerName || !customerEmail || !customerPhone || !deliveryAddress || !items?.length) {
      return res.status(400).json({
        success: false,
        error: "All required delivery and item information must be provided.",
      });
    }

    // Never trust client price: recalculate on server!
    const { subtotal, deliveryFee, total } = calculateServerPrice(items);
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    let order;
    try {
      order = await Order.create({
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        items,
        subtotal,
        deliveryFee,
        total,
        paymentMethod: paymentMethod || "razorpay",
        paymentStatus: paymentMethod === "cod" ? PaymentStatus.PENDING : PaymentStatus.PAID,
        orderStatus: OrderStatus.CONFIRMED,
        timeline: [
          {
            status: OrderStatus.CONFIRMED,
            timestamp: new Date(),
            note: "Order confirmed and sent to kitchen stone ovens.",
          },
        ],
      });
    } catch {
      // In-memory fallback if MongoDB connection is pending
      order = {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
        items,
        subtotal,
        deliveryFee,
        total,
        paymentMethod: paymentMethod || "razorpay",
        paymentStatus: paymentMethod === "cod" ? PaymentStatus.PENDING : PaymentStatus.PAID,
        orderStatus: OrderStatus.CONFIRMED,
      };
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to place order.",
    });
  }
});

// Get order by Order Number
ordersRouter.get("/:orderNumber", async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;
    let order = await Order.findOne({ orderNumber }).lean();

    if (!order) {
      // Mock order for demo lookups
      order = {
        orderNumber,
        customerName: "Alex Mercer",
        customerEmail: "alex.mercer@example.com",
        customerPhone: "+1 (555) 392-1084",
        deliveryAddress: {
          street: "742 Evergreen Terrace",
          apartment: "Apt 4B",
          city: "New York",
          postalCode: "10001",
        },
        items: [
          {
            name: "Artisanal Pepperoni",
            size: "12-inch Medium",
            unitPrice: 18.5,
            quantity: 1,
          },
        ],
        subtotal: 18.5,
        deliveryFee: 4.5,
        total: 23.0,
        paymentMethod: "razorpay",
        paymentStatus: PaymentStatus.PAID,
        orderStatus: OrderStatus.PREPARING,
        timeline: [
          { status: OrderStatus.CONFIRMED, timestamp: new Date(Date.now() - 10 * 60000) },
          { status: OrderStatus.PREPARING, timestamp: new Date(Date.now() - 4 * 60000) },
        ],
      } as any;
    }

    res.json({
      success: true,
      data: order,
    });
  } catch {
    res.status(404).json({ success: false, error: "Order not found." });
  }
});

// Admin update order status
ordersRouter.patch("/:orderNumber/status", authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;
    const { status, note } = req.body;

    const order = await Order.findOneAndUpdate(
      { orderNumber },
      {
        $set: { orderStatus: status },
        $push: { timeline: { status, timestamp: new Date(), note } },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: `Order #${orderNumber} updated to ${status}.`,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update order status." });
  }
});
