// auth.routes.ts
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requestOtp, verifyOtpCode } from "../controllers/auth.controller";
const router = Router();

const otpLimiter = rateLimit({ windowMs: 60_000, max: 5 });
router.post("/request-otp", otpLimiter, requestOtp);
router.post("/verify-otp", verifyOtpCode);

export default router;
