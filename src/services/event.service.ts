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

    async editEvent(id: string, evento: Event){
        return new Promise( async (resolve, reject) => {
            const eventos = await this.redisService.getObject<Event[]>("events");
            const ev = eventos.findIndex( (el) => el.id === id);
            if(ev < 0) return reject("Evento no encontrado");
            const updatedEvent = Object.assign(newEventos[ev], evento);
            eventos[ev] = updatedEvent
            await this.redisService.setObject("events", eventos);
            resolve(updatedEvent);
        })
    }

    async deleteEvent(id: string){
        return new Promise( async (resolve, reject) => {
            const eventos = await this.redisService.getObject<Event[]>("events");
            const ev = eventos.findIndex( (el) => el.id === id);
            if(ev < 0) return reject("Evento no encontrado");
            eventos.splice(ev, 1);
            await this.redisService.setObject("events", eventos);
            resolve({})
        })        
    }


}