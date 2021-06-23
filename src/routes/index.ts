import { Router } from "express";
import homeAssistantRoutes from "./home-assistant.routes"
import loginRoutes from "./login.routes"
import eventRoutes from './event.routes'
import { authenticateToken } from "../middlewares/jwt.middleware";

const router = Router();

router.use("/ha", authenticateToken , homeAssistantRoutes)
router.use("/user", loginRoutes)
router.use("/calendario", authenticateToken ,eventRoutes)

export default router;

