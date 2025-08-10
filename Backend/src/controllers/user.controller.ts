import { Request, Response } from "express";
import User from "../models/User";
import { z } from "zod";

export async function me(req: Request, res: Response) {
  const uid = (req as any).user.uid;
  const user = await User.findById(uid);
  res.json(user);
}

const profileSchema = z.object({
  name: z.string().max(100).optional(),
  city: z.string().max(60).optional(),
  tags: z.array(z.string()).optional()
});
export async function updateMe(req: Request, res: Response) {
  const uid = (req as any).user.uid;
  const patch = profileSchema.parse(req.body);
  const user = await User.findByIdAndUpdate(uid, patch, { new: true });
  res.json(user);
}
