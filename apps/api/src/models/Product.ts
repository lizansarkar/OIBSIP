import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: "pizza" | "sides" | "desserts" | "beverages";
  description: string;
  ingredients: string[];
  basePrice: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isPopular: boolean;
  isChefSpecial: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  inStock: boolean;
  stockQuantity: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ["pizza", "sides", "desserts", "beverages"],
      index: true,
    },
    description: { type: String, required: true },
    ingredients: [{ type: String }],
    basePrice: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 10 },
    isPopular: { type: Boolean, default: false },
    isChefSpecial: { type: Boolean, default: false },
    isVegetarian: { type: Boolean, default: false },
    isSpicy: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 50 },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
