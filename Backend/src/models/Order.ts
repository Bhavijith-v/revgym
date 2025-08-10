import { Schema, model, Types } from "mongoose";

const OrderSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  items: [{
    product: { type: Types.ObjectId, ref: "Product" },
    qty: Number,
    flavor: String,
    size: String,
    price: Number
  }],
  amount: Number,
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
  provider: { type: String, default: "razorpay" },
  providerOrderId: String,
  providerPaymentId: String,
  providerSignature: String
}, { timestamps: true });

export default model("Order", OrderSchema);
