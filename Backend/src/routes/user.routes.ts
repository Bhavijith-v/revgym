// user.routes.ts
import { Router } from "express";
import { auth } from "../middleware/auth";
import { me, updateMe } from "../controllers/user.controller";
const router = Router();

router.get("/me", auth, me);
router.patch("/me", auth, updateMe);

export default router;
