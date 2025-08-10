import { Request, Response } from "express";
import Razorpay from "razorpay";
import Order from "../models/Order";
import { env } from "../config/env";

const rp = env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: env.RAZORPAY_KEY_ID, key_secret: env.RAZORPAY_KEY_SECRET })
  : null;

// POST /payments/create-order
export async function createOrder(req: Request, res: Response) {
  const uid = (req as any).user.uid;
  const { items } = req.body as {
    items: Array<{ productId: string; qty: number; price: number; flavor?: string; size?: string }>;
  };
  const amount = items.reduce((s, it) => s + it.price * it.qty, 0);

  const order = await Order.create({
    user: uid,
    items: items.map(i => ({ product: i.productId, ...i })),
    amount,
    status: rp ? "created" : "paid", // if mocking, mark paid directly
  });

  if (!rp) return res.json({ mocked: true, orderId: order.id, status: order.status });

  const rOrder = await rp.orders.create({
    amount: amount * 100, // paise
    currency: "INR",
    receipt: order.id,
    notes: { source: "rev-gym-app" }
  });

  order.providerOrderId = rOrder.id;
  await order.save();

  res.json({
    key: env.RAZORPAY_KEY_ID,
    orderId: rOrder.id,
    amount: rOrder.amount,
    currency: rOrder.currency,
  });
}

// POST /payments/verify
export async function verifyPayment(req: Request, res: Response) {
  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (!rp) {
    order.status = "paid";
    await order.save();
    return res.json({ ok: true, mocked: true });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const crypto = await import("crypto");
  const expected = crypto.createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(body).digest("hex");

  if (expected !== razorpay_signature) {
    order.status = "failed";
    await order.save();
    return res.status(400).json({ message: "Signature mismatch" });
  }

  order.status = "paid";
  order.providerPaymentId = razorpay_payment_id;
  order.providerSignature = razorpay_signature;
  await order.save();

  res.json({ ok: true });
}
