import { Router } from "express";
import homeAssistantRoutes from "./home-assistant.routes"
import loginRoutes from "./login.routes"
import eventRoutes from './event.routes'

const router = Router();

router.use("/ha",homeAssistantRoutes)
router.use("/user", loginRoutes)
router.use("/calendario", eventRoutes)

export default router;