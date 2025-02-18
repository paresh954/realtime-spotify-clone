import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { getStates } from "../controllers/stat.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStates);

export default router;
