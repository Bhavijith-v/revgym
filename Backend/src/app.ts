import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/products.routes";
import planRoutes from "./routes/plans.routes";
import paymentRoutes from "./routes/payments.routes";

const app = express();

app.use(helmet());
app.use(cors({ origin: "*", credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ ok: true, name: "Revolution Gym API" }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/plans", planRoutes);
app.use("/payments", paymentRoutes);

app.use(errorHandler);

export default app;
