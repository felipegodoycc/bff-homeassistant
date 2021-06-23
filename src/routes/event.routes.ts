import { Router } from "express";
import { EventController } from "../controllers/event.controller";


const router = Router();
const controller = new EventController();


router.get("/eventos", (req,res) => controller.getEventos(req,res))
router.post("/eventos", (req,res) => controller.createEvent(req,res))

export default router;