import { env } from "./config/env";
import { connectDB } from "./config/db";
import app from "./app";

(async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`🚀 API on http://localhost:${env.PORT}`);
  });
})();
