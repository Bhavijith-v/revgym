import { Request, Response } from "express";
import { z } from "zod";
import { createOtp, verifyOtp } from "../utils/otp";
import User from "../models/User";
import { signJwt } from "../middleware/auth";

const phoneSchema = z.object({ phone: z.string().regex(/^\d{10}$/) });
const verifySchema = z.object({ phone: z.string().regex(/^\d{10}$/), code: z.string().length(6) });

export async function requestOtp(req: Request, res: Response) {
  const { phone } = phoneSchema.parse(req.body);
  const result = await createOtp(phone);
  res.json({ ok: true, otp: result === "sent" ? undefined : result }); // expose in dev only
}

export async function verifyOtpCode(req: Request, res: Response) {
  const { phone, code } = verifySchema.parse(req.body);
  const ok = await verifyOtp(phone, code);
  if (!ok) return res.status(400).json({ message: "Invalid code" });

  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ phone, name: "" });

  const token = signJwt({ uid: user.id, phone: user.phone });
  res.json({ token, user });
}
