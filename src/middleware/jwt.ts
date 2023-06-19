import jwt from 'jsonwebtoken';
import {AuthUser} from "../entities/auth-user";
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();
export class JwtService {
    static generateToken(user: AuthUser): {accessToken, refreshToken} {

        const payload = {
            sub: user.profile_id,
            username: user.username,
            // add any additional claims to the payload as needed
        };
        const refreshToken = jwt.sign({
            payload,
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        // Assigning refresh token in http-only cookie
        const accessToken = jwt.sign({
            payload,
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {accessToken, refreshToken};

    }

    static verifyToken(token: string): { sub: string, username: string } {
        return jwt.verify(token, process.env.JWT_SECRET) as { sub: string, username: string };
    }

}


export const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};