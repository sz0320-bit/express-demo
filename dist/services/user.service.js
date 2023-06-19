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
        const queryRunner = app_data_source_1.default.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newProfile = await queryRunner.manager.save(queryRunner.manager.create(user_1.User, {
                username,
                profile_pic,
                date_created: new Date(),
                date_updated: new Date(),
            }));
            const newUser = await queryRunner.manager.save(queryRunner.manager.create(auth_user_1.AuthUser, {
                username,
                password: password,
                profile_id: newProfile,
                email: email,
            }));
            await queryRunner.commitTransaction();
            return {
                message: 'Success',
                username: newUser.username,
                profile_id: newProfile.id,
            };
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            return {
                message: 'Error',
                error: error.message,
            };
        }
        finally {
            await queryRunner.release();
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
