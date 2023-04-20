"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const auth_user_1 = require("../entities/auth-user");
const app_data_source_1 = __importDefault(require("../app-data-source"));
const userRepository = app_data_source_1.default.manager.getRepository(auth_user_1.AuthUser);
class AuthService {
    async validateUser(username, password) {
        const user = await userRepository.findOne({ where: { username } });
        if (user && await (0, bcrypt_1.compare)(password, user.password)) {
            // The password is correct
            return user;
        }
        // The username or password is incorrect
        return null;
    }
    async login(user) {
        const payload = { sub: user.id };
        // return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return 'Logged In';
    }
}
exports.default = new AuthService();
