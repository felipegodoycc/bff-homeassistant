import { Router } from "express";
import { UserController } from "../controllers/login.controller";
import { authenticateToken } from "../middlewares/jwt.middleware";

const router = Router();
const controller = new UserController();

router.post("/login", (req,res) => controller.login(req,res))
router.get("/:id", authenticateToken , (req,res) => controller.getUser(req,res))

// Metodo para creacion de usuario segun variable de entorno
if(process.env.ALLOW_CREATE_USER && process.env.ALLOW_CREATE_USER == "true") router.post("/", (req,res) => controller.createuser(req,res))

export default router;