import myDataSource from "../app-data-source";
import { User } from "../entities/user";

const userRepository = myDataSource.manager.getRepository(User);

class UserService {
    async getUserById(id) {
        const user = await userRepository.findOneBy({ id });
        return user || [];
    }

    async addUser({ username, profile_pic }) {
        if (!username || !profile_pic) {
            throw new Error('Username and profile picture are required.');
        }

        const newUser = await userRepository.create({
            username,
            profile_pic,
            date_created: new Date(),
            date_updated: new Date(),
        });

        return newUser;
    }

    async deleteUser(id) {
        const result = await userRepository.delete({ id });
        if (result.affected) {
            return `Successfully deleted user ${id}.`;
        } else {
            throw new Error('No user found with that ID.');
        }
    }

    async getAllUsers() {
        const users = await userRepository.find();
        return users;
    }
}

export default new UserService();
