import { createClient, RedisClient } from "redis";

export class RedisService {
    private redisClient: RedisClient;
    private redisUrl = process.env.REDIS_URL as string;

    constructor(){
        this.redisClient = createClient(this.redisUrl);
        this.redisClient.on("ready", () => console.log("Redis conectado"));
        this.redisClient.on("error", (error) => console.error(error));
        if(process.env.RESET_DB && process.env.RESET_DB == "true"){
            console.log("Limpieza redis");
            this.redisClient.flushdb();
            this.redisClient.flushall();
            this.setObject("users", []);
            this.setObject("events", []);
        }
    }

    set(key: string, data: string): Promise<string>{
        return new Promise( (resolve, reject) => {
            this.redisClient.set(key, data, (err,cb) => {
                if(err) return reject(err)
                return resolve(cb)
            })
        }) 
    }

    get(key: string): Promise<string> {
        return new Promise( (resolve, reject) => {
            this.redisClient.get(key, (err, cb) => {
                if(err) return reject(err)
                return resolve(cb as string)
            })
        }) 
    }

    delete(key: string): Promise<number> {
        return new Promise( (resolve, reject) => {
            this.redisClient.del(key, (err, cb) => {
                if(err) return reject(err)
                return resolve(cb)
            })
        }) 
    }


    async setObject(key: string, obj: Object) {
        const objString = JSON.stringify(obj);
        return await this.set(key, objString)
    }

    async getObject<T>(key: string): Promise<T> {
        const objString = await this.get(key);
        return JSON.parse(objString)
    }

}