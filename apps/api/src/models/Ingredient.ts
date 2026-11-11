import mongoose, { Schema, Document } from "mongoose";
import { IngredientCategory } from "@workspace/shared";

export interface IIngredient extends Document {
  name: string;
  category: IngredientCategory;
  price: number;
  currentStock: number;
  unit: string;
  threshold: number;
  isAvailable: boolean;
}

const IngredientSchema = new Schema<IIngredient>(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: Object.values(IngredientCategory),
      index: true,
    },
    price: { type: Number, required: true },
    currentStock: { type: Number, required: true, default: 20 },
    unit: { type: String, default: "portions" },
    threshold: { type: Number, default: 5 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Ingredient = mongoose.model<IIngredient>(
  "Ingredient",
  IngredientSchema
);
