import { Router, type Request, type Response } from "express";
import { Product } from "../models/Product.js";
import { SAMPLE_PRODUCTS } from "@workspace/shared";
import { authenticate, requireAdmin } from "../middleware/auth.js";

export const productsRouter = Router();

// Get all products (with DB fallback to sample products for resilient operation)
productsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    let products = await Product.find().lean();

    if (!products || products.length === 0) {
      products = SAMPLE_PRODUCTS as any;
    }

    if (category && category !== "all") {
      products = products.filter((p) => p.category === category);
    }

    if (search && typeof search === "string") {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.json({
      success: true,
      count: SAMPLE_PRODUCTS.length,
      data: SAMPLE_PRODUCTS,
    });
  }
});

// Get single product by slug
productsRouter.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    let product = await Product.findOne({ slug }).lean();

    if (!product) {
      product = SAMPLE_PRODUCTS.find((p: any) => p.slug === slug) as any;
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found.",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    const product = SAMPLE_PRODUCTS.find((p: any) => p.slug === req.params.slug);
    if (product) {
      return res.json({ success: true, data: product });
    }
    res.status(404).json({ success: false, error: "Product not found." });
  }
});

// Admin create product
productsRouter.post("/", authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create product.",
    });
  }
});
