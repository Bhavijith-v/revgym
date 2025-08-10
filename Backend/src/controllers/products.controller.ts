import { Request, Response } from "express";
import Product from "../models/Product";

export async function listProducts(_req: Request, res: Response) {
  const items = await Product.find().sort({ createdAt: -1 }).lean();
  res.json(items);
}
export async function getProduct(req: Request, res: Response) {
  const item = await Product.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
}
