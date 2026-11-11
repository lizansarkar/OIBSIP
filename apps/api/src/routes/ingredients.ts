import { Router, type Request, type Response } from "express";
import { BUILDER_OPTIONS } from "@workspace/shared";

export const ingredientsRouter = Router();

// Get builder options (bases, sauces, cheeses, vegetables, meats)
ingredientsRouter.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: BUILDER_OPTIONS,
  });
});
