import AuthService from "../services/auth.service";
import {JwtService} from "../middleware/jwt";
import jwt from 'jsonwebtoken';
import path from "path";

require('dotenv').config();

export const login = async (req, res) => {
    const {username, password} = req.body;
    const user = await AuthService.validateUser(username, password);
    if (!user) {
        return res.status(401).json({message: 'Invalid credentials'});
    }

    const currentTime = new Date();
    const refreshTime = new Date(currentTime.getTime() + 55 * 60000);
    const expireTime = new Date(currentTime.getTime() + 60 * 60000);


    const {accessToken, refreshToken} = JwtService.generateToken(user);

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
        access_token: accessToken,
        refresh_token: refreshToken,
        username: user.username,
        userId: user.id,
        refresh_in: refreshTime,
        expires_in: expireTime
    });
}

export const refresh = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(406).json({message: 'Unauthorized'});
            } else {
                const user = decoded.payload;
                const payload = {
                    sub: user.id,
                    username: user.username,
                };
                const refreshToken = jwt.sign({
                    payload,
                }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

                const accessToken = jwt.sign({
                    payload,
                }, process.env.JWT_SECRET, {expiresIn: '1h'});

                const currentTime = new Date();
                const refreshTime = new Date(currentTime.getTime() + 55 * 60000);
                const expireTime = new Date(currentTime.getTime() + 60 * 60000);

                res.json({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    username: user.username,
                    userId: user.id,
                    refresh_in: refreshTime,
                    expires_in: expireTime
                });
            }
        })
}
