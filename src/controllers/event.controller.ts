import { Request, Response } from "express";
import { EventService } from "../services/event.service";
import { Controller } from "../utils/utils";


export class EventController extends Controller {
    private eventService = new EventService();

    async getEventos(req: Request, res: Response){
        this.getResponse(this.eventService.getEvents())(res);
    }

    async createEvent(req: Request, res: Response){
        const body = req.body;
        this.getResponse(this.eventService.addEvent(body))(res);
    }

    async editEvent(req: Request, res: Response){
        const id = req.params.id;
        const body = req.body;
        this.getResponse(this.eventService.editEvent(id,body))(res);
    }

    async deleteEvent(req: Request, res: Response){
        const id = req.params.id;
        this.getResponse(this.eventService.deleteEvent(id))(res);
    }
}