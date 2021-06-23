import { User } from "../types/user";
import { JwtService } from "./jwt.service";
import { RedisService } from "./redis.service";

export class UserService { 
    private redisService = new RedisService();
    private jwtService = new JwtService();

    async login(body: { username: any; password: any; }){
        return new Promise( async (resolve, reject) => {
            const usuarios = await this.redisService.getObject<User[]>("users");
            const user = usuarios.find( usr => usr.username === body.username && usr.password === body.password);
            if(!user) return reject("Usuario o contrasena incorrectos");
            const { password, ...findUser} = user;
            const token = this.jwtService.loginUser(findUser);
            return resolve({ user: findUser, token })
        })
    }

    async getUser(userId: string){
        return new Promise( async (resolve, reject) => {
            const usuarios = await this.redisService.getObject<User[]>("users");
            const user = usuarios.find( usr => usr.id === parseInt(userId));
            if(!user) return reject("Usuario no encontrado");
            const { password, ...findUser} = user;
            return resolve(findUser)
        })
    }

    async createUser(body: User){
        return new Promise( async (resolve, reject) => {
            const usuarios = await this.redisService.getObject<User[]>("users");
            const user = usuarios.find( usr => usr.username === body.username);
            if(user) return reject("Usuario ya existe");
            usuarios.push({id: usuarios.length + 1, ...body});
            await this.redisService.setObject("users", usuarios);
            const { password, ...createdUser} = body;
            return resolve(createdUser);
        })
    }
}