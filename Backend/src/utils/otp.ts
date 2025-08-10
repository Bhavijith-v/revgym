import Otp from "../models/Otp";
import { env } from "../config/env";

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createOtp(phone: string) {
  const code = generateOtp();
  await Otp.create({ phone, code });
  // SMS gateway here (Twilio/MSG91) – omitted for now
  return env.OTP_PROVIDER === "mock" ? code : "sent";
}

export async function verifyOtp(phone: string, code: string) {
  const found = await Otp.findOne({ phone, code });
  if (!found) return false;
  await Otp.deleteMany({ phone }); // consume all
  return true;
}
