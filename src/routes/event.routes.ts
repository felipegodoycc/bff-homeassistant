import { Router } from "express";
import { EventController } from "../controllers/event.controller";


const router = Router();
const controller = new EventController();


router.get("/eventos", (req,res) => controller.getEventos(req,res))
router.post("/eventos", (req,res) => controller.createEvent(req,res))
router.put("/eventos/:id", (req,res) => controller.editEvent(req,res))
router.delete("/eventos/:id", (req,res) => controller.deleteEvent(req,res))

export default router;