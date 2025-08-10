// payments.routes.ts
import { Router } from "express";
import { auth } from "../middleware/auth";
import { createOrder, verifyPayment } from "../controllers/payments.controller";
const router = Router();

router.post("/create-order", auth, createOrder);
router.post("/verify", auth, verifyPayment);

export default router;
