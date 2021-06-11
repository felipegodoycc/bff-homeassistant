import { UserService } from "../services/login.service";
import { Controller } from "../utils/utils";
import { Request, Response } from "express";

export class UserController extends Controller {
    private userService = new UserService();
    
    async login(req: Request, res: Response){
        const body = req.body;
        await this.getResponse(this.userService.login(body))(res);
    }

    async getUser(req: Request, res: Response){
        const userId = req.params.id;
        await this.getResponse(this.userService.getUser(userId))(res);
    }
}