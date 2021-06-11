import { Request, Response } from "express";
import { EventService } from "../services/event.service";
import { Controller } from "../utils/utils";


export class EventController extends Controller {
    private eventService = new EventService();

    async getEventos(req: Request, res: Response){
        this.getResponse(this.eventService.getEvents())(res);
    }
}