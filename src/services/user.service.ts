import myDataSource from "../app-data-source";
import {User} from "../entities/user";
import {AuthUser} from "../entities/auth-user";

const profileRepository = myDataSource.manager.getRepository(User);
const userRepository = myDataSource.manager.getRepository(AuthUser);

class UserService {
    async getUserById(id) {
        const user = await profileRepository.findOneBy({id});
        return user || [];
    }

    async addUser({username, profile_pic, password, email}) {
        if (!username || !profile_pic || !password || !email) {
            throw new Error('values are required.');
        }

        try {
            const newProfile = await profileRepository.save(
                profileRepository.create({
                    username,
                    profile_pic,
                    date_created: new Date(),
                    date_updated: new Date(),
                })
            );


            const newUser = await userRepository.save(
                userRepository.create({
                    username,
                    password: password,
                    email,
                    profile_id: newProfile,
                })
            );

        } catch (error) {
            console.log(error)
            throw error
        }


        return 'Success';
    }

    async deleteUser(id) {
        await userRepository.delete({profile_id: id});
        const result = await profileRepository.delete({id});

        if (result.affected) {
            return `Successfully deleted user ${id}.`;
        } else {
            throw new Error('No user found with that ID.');
        }
    }

    async getAllUsers() {
        const users = await profileRepository.find();
        return users;
    }
}

export default new UserService();
