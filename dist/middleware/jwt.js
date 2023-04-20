"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAccessToken = exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
class JwtService {
    static generateToken(user) {
        const payload = {
            sub: user.id,
            username: user.username,
            // add any additional claims to the payload as needed
        };
        const refreshToken = jsonwebtoken_1.default.sign({
            payload,
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        // Assigning refresh token in http-only cookie
        const accessToken = jsonwebtoken_1.default.sign({
            payload,
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { accessToken, refreshToken };
    }
    static verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
}
exports.JwtService = JwtService;
const authenticateAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
exports.authenticateAccessToken = authenticateAccessToken;
