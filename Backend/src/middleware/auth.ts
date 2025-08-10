import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function signJwt(payload: object) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "30d" });
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    (req as any).user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}
