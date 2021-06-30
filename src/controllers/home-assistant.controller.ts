import { Request, Response } from "express";
import { HomeAssistantService } from "../services/home-assistant.service";
import { Controller, HAConfig } from "../utils/utils";


export class HomeAssistantController extends Controller {
    private homeAssistantService = new HomeAssistantService();

    async getHistorico(req: Request, res: Response){
        const datetime = req.params.datetime;
        await this.getResponse(this.homeAssistantService.getLastHistory(HAConfig.tracker, datetime))(res);
    }

    async getClima(req: Request, res: Response){
        await this.getResponse(this.homeAssistantService.getStatusById(HAConfig.clima))(res);
    }

    async getSensores(req: Request, res: Response){
        await this.getResponse(this.homeAssistantService.getStatus())(res);
    }

    async setStatusSwitch(req: Request, res: Response){
        const body = req.body;
        await this.getResponse(this.homeAssistantService.setStatus(body, 'switch'))(res);
    }

    async setStatusLight(req: Request, res: Response){
        const body = req.body;
        await this.getResponse(this.homeAssistantService.setStatus(body, 'light'))(res);
    }
}