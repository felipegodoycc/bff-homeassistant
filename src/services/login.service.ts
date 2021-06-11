import usuarios from "../data/users.data"

export class UserService {    
    async login(body: { username: any; password: any; }){
        return new Promise( (resolve, reject) => {
            const user = usuarios.find( usr => usr.username === body.username && usr.password === body.password);
            if(!user) return reject("Usuario o contrasena incorrectos");
            const { password, ...findUser} = user;
            return resolve(findUser)
        })
    }

    async getUser(userId: string){
        return new Promise( (resolve, reject) => {
            const user = usuarios.find( usr => usr.id === parseInt(userId));
            if(!user) return reject("Usuario no encontrado");
            const { password, ...findUser} = user;
            return resolve(findUser)
        })
    }
}