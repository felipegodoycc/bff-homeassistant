import axios from "axios";
import { HAEntity, HASensorAttributes } from "../types/entity";
import { cleanEntitys, cleanLocation, compose, filterEntitys, HAConfig, reducePoints } from "../utils/utils";

export class HomeAssistantService {

    constructor(){}

    private httpClient = axios.create({
        baseURL: `${process.env.HA_API_URL}/api`,
        headers: { 
            'Authorization': `Bearer ${process.env.HA_TOKEN}` 
        }
    })

    async getLastHistory(entityId: string, date: string = ''){
        const { data } = await this.httpClient.get(`/history/period/${date}`, {
            params: {
                filter_entity_id: entityId
            }
        });
        return compose(cleanLocation, reducePoints)(data);
    }

    async getStatusById(entity_id:string){
        const { data } = await this.httpClient.get(`/states/${entity_id}`);
        return data;
    }

    async getStatus(){
        const { data } = await this.httpClient.get<HAEntity<HASensorAttributes>[]>("/states");
        return compose(filterEntitys, cleanEntitys)(data);            
    }

    async setStatus(body: { entity_id: any; status: any; }, service: 'switch' | 'light'){
        const entityId = body.entity_id;
        const status = body.status;
        if(!HAConfig.allowedStates.includes(status)) throw Error("Estado no valido");
        const apiUrl = `/services/${service}/${status}`;
        const { data } = await this.httpClient.post(apiUrl, { "entity_id": entityId });
        return data;
    }

}