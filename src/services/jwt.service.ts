import { User } from "../types/user";
import jwt from "jsonwebtoken";

export class JwtService {
    private secretKey = process.env.SECRET_KEY || "llavesecreta";
    constructor(){
    }

    loginUser(user: User){
        return jwt.sign(user, 
                        this.secretKey,
                        {
                            expiresIn: "1d",
                            algorithm: "HS256"
                        });
    }
    
    verifyJwt(jwtToken: string){
        return jwt.verify(jwtToken, this.secretKey);
    }
}