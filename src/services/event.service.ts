import { Event } from "../types/event";
import { RedisService } from "./redis.service"


export class EventService {
    private redisService = new RedisService();

    constructor(){}

    async getEvents(){
        return new Promise( async resolve => {
            const eventos = await this.redisService.getObject<Event[]>("events");
            resolve(eventos)
        })
    }

    async addEvent(evento: Event){
        return new Promise( async resolve => {
            const eventos = await this.redisService.getObject<Event[]>("events");
            const ev: Event = {
                id: String(eventos.length + 1),
                ...evento
            }
            eventos.push(ev)
            await this.redisService.setObject("events", eventos);
            resolve(ev);
        })
    }
}