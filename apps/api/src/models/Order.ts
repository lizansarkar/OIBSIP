import mongoose, { Schema, Document } from "mongoose";
import { OrderStatus, PaymentStatus, PizzaSize } from "@workspace/shared";

export interface IOrderItem {
  productId?: string;
  name: string;
  size: PizzaSize;
  unitPrice: number;
  quantity: number;
  isCustom?: boolean;
  selectedIngredients?: string[];
}

export interface IOrder extends Document {
  orderNumber: string;
  userId?: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: {
    street: string;
    apartment?: string;
    city: string;
    postalCode: string;
    instructions?: string;
  };
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: "razorpay" | "cod";
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  timeline: Array<{
    status: OrderStatus;
    timestamp: Date;
    note?: string;
  }>;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    deliveryAddress: {
      street: { type: String, required: true },
      apartment: { type: String },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      instructions: { type: String },
    },
    items: [
      {
        productId: { type: String },
        name: { type: String, required: true },
        size: { type: String, required: true },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        isCustom: { type: Boolean, default: false },
        selectedIngredients: [{ type: String }],
      },
    ],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["razorpay", "cod"], required: true },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.CONFIRMED,
      index: true,
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    timeline: [
      {
        status: { type: String, enum: Object.values(OrderStatus) },
        timestamp: { type: Date, default: Date.now },
        note: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
