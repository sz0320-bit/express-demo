"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.login = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
const jwt_1 = require("../middleware/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await auth_service_1.default.validateUser(username, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const currentTime = new Date();
    const refreshTime = new Date(currentTime.getTime() + 55 * 60000);
    const expireTime = new Date(currentTime.getTime() + 60 * 60000);
    const { accessToken, refreshToken } = jwt_1.JwtService.generateToken(user);
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    const userResponse = {
        id: user.profile_id.id,
        username: user.username,
        profile_pic: user.profile_id.profile_pic,
        email: user.email
    };
    res.json({
        access_token: accessToken,
        refresh_token: refreshToken,
        user: userResponse,
        refresh_in: refreshTime,
        expires_in: expireTime
    });
};
exports.login = login;
const refresh = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(406).json({ message: 'Unauthorized' });
        }
        else {
            const user = decoded.payload;
            const payload = {
                sub: user.id,
                username: user.username,
            };
            const refreshToken = jsonwebtoken_1.default.sign({
                payload,
            }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            const accessToken = jsonwebtoken_1.default.sign({
                payload,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
    });
};
exports.refresh = refresh;
