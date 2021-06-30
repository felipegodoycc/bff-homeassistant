import { Router } from "express";
import { HomeAssistantController } from "../controllers/home-assistant.controller";

const router = Router();
const controller = new HomeAssistantController();

router.get("/getEstados", (req,res) => controller.getSensores(req,res))
router.get("/getPhone", (req,res) => controller.getSensoresCelular(req,res))
router.get("/getClima", (req,res) => controller.getClima(req,res))
router.get("/getDesplazamiento/:datetime", (req,res) => controller.getHistorico(req,res))
router.post("/setStatus/light", (req,res) => controller.setStatusLight(req,res))
router.post("/setStatus/switch", (req,res) => controller.setStatusSwitch(req,res))

export default router;