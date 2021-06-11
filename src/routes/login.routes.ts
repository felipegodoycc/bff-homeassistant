import { Router } from "express";
import { UserController } from "../controllers/login.controller";

const router = Router();
const controller = new UserController();

router.post("/login", (req,res) => controller.login(req,res))
router.get("/:id", (req,res) => controller.getUser(req,res))

export default router;