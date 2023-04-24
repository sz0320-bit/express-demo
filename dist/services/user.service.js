"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_data_source_1 = __importDefault(require("../app-data-source"));
const user_1 = require("../entities/user");
const auth_user_1 = require("../entities/auth-user");
const profileRepository = app_data_source_1.default.manager.getRepository(user_1.User);
const userRepository = app_data_source_1.default.manager.getRepository(auth_user_1.AuthUser);
class UserService {
    async getUserById(id) {
        const user = await profileRepository.findOneBy({ id });
        return user || [];
    }
    async addUser({ username, profile_pic, password, email }) {
        if (!username || !password || !email) {
            throw new Error('Values are required.');
        }
        try {
            const newProfile = await profileRepository.save(profileRepository.create({
                username,
                profile_pic,
                date_created: new Date(),
                date_updated: new Date(),
            }));
            const newUser = await userRepository.save(userRepository.create({
                username,
                password: password,
                email,
                profile_id: newProfile,
            }));
            return {
                message: 'Success',
                username: newUser.username,
                profile_id: newProfile.id,
            };
        }
        catch (error) {
            console.log(error);
            return {
                message: 'Error',
                error: error.message,
            };
        }
    }
    async deleteUser(id) {
        const result = await profileRepository.delete({ id: id });
        if (result.affected) {
            return `Successfully deleted user ${id}.`;
        }
        else {
            throw new Error('No user found with that ID.');
        }
    }
    async getAllUsers() {
        const users = await profileRepository.find();
        return users;
    }
}
exports.default = new UserService();
