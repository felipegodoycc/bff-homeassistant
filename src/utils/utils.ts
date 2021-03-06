import axios, { AxiosPromise } from "axios";
import { Response } from "express";
import { HAEntity, HASensorAttributes, HATrackerAttributes, SimplePoint } from "../types/entity";

export const HAConfig = {
    clima: "weather.casa",
    tracker: "device_tracker.mi_10_2",
    persona: "person.felipe",
    sensores:  [
        "sensor.temperatura",
        "sensor.humedad",
        "sensor.presion",
        "binary_sensor.movimiento_pasillo",
        "binary_sensor.movimiento_patio",
        "binary_sensor.sensor_puerta",
        "binary_sensor.sensor_humo"  
    ],
    luces:{
        items: [
        "light.luces_escritorio",
        "light.lampara_velador",
        ]
    },
    switch:{
        items: [
            "switch.13106300600194ddfe39_1",
        ]
    },
    phoneSensors: [
        "sensor.mi_10_nivel_de_la_bateria_2",
        "sensor.mi_10_geocoded_location",
        "sensor.mi_10_estado_de_la_bateria_2",
        "sensor.mi_10_temperatura_de_la_bateria"
    ],
    allowedStates: ["turn_on","turn_off","toggle"]
}

export class Controller {
    constructor(){}

    public getResponse = <T>(promesa: Promise<T>) => async (res:Response) =>  {
        try {
            const result = await promesa;
            return res.json({
                ok: true,
                payload: result,
                message: "Datos encontrados con exito"
            });
        } catch (error) {
            console.log("Error: ", error)
            return res.status(400).json({
                ok: false,
                payload: {
                    error
                },
                message: "Ha ocurrido un error"
            })        
        }
    }
}

export const compose = (...fns: any[]) => (x: any) => fns.reduce( (y,f) => f(y), x)

export function filterEntitys(data: HAEntity<HASensorAttributes>[]){
    return data.filter( entity => (HAConfig.sensores.includes(entity.entity_id) || HAConfig.luces.items.includes(entity.entity_id) || HAConfig.switch.items.includes(entity.entity_id)))
}

export function filterPhoneEntitys(data: HAEntity<HASensorAttributes>[]){
    return data.filter( entity => (HAConfig.phoneSensors.includes(entity.entity_id)))
}

export function cleanEntitys(data: HAEntity<HASensorAttributes>[]){
    return data.map( entity => 
        ({
            entity_id: entity.entity_id, 
            state: entity.state, 
            type: entity.entity_id.split('.')[0],
            device_class: entity.attributes?.device_class,
            friendly_name: entity.attributes?.friendly_name,
            icon: entity.attributes?.icon
        })
    )
}

export function cleanLocation(data: Array<HAEntity<HATrackerAttributes>[]>){
    console.log("Clean location: ", data);
    const points = data[0].map( entity => 
        ({
            latitude: entity.attributes.latitude,
            longitude: entity.attributes.longitude,
            timestamp: entity.last_updated,
            status: entity.state
        })
    )
    return points;
}

export function reducePoints(data: Array<SimplePoint>){
    console.log("Reduce points: ", data);
    const reducedPoints = data.reduce( (acc, item, index) => {
        const lastPoint = acc[acc.length - 1];
        if( lastPoint?.status === item.status && item.status === "home"){
            return acc
        }
        acc.push(item)
        return acc        
    }, [] as SimplePoint[])
    return reducedPoints
}
