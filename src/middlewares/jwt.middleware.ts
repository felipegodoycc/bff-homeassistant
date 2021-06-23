import { NextFunction, Request, Response } from "express";
import { JwtService } from "../services/jwt.service"


export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const jwtService = new JwtService();
    const authHeader = req.headers['authorization']
    
    try {
        const token = authHeader && authHeader.split(' ')[1]
  
        if (token == null) return res.sendStatus(401)

        const user = jwtService.verifyJwt(token);

        next();
    } catch (error) {
        return res.sendStatus(403);
    }
}