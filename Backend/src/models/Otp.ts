import { Schema, model } from "mongoose";

const OtpSchema = new Schema({
  phone: { type: String, index: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // 5 min
});

export default model("Otp", OtpSchema);
