import "dotenv/config";

export const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  MONGO: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ?? "",
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ?? "",
  OTP_PROVIDER: process.env.OTP_PROVIDER ?? "mock",
};

if (!env.MONGO || !env.JWT_SECRET) {
  throw new Error("Missing required env vars.");
}
