import eventos from "../data/events.data"


export class EventService {
    constructor(){}

    async getEvents(){
        return new Promise( resolve => {
            resolve(eventos)
        })
    }
}