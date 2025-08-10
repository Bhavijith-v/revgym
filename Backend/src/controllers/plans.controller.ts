import { Request, Response } from "express";
import Plan from "../models/Plan";

export async function listPlans(_req: Request, res: Response) {
  const plans = await Plan.find().lean();
  res.json(plans);
}
