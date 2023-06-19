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

    async addUser({ username, profile_pic, password, email }) {
        if (!username  || !password || !email) {
            throw new Error('Values are required.');
        }

        const queryRunner = myDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {




            const newProfile = await queryRunner.manager.save(
                queryRunner.manager.create(User,{
                    username,
                    profile_pic,
                    date_created: new Date(),
                    date_updated: new Date(),
                })
            );

            const newUser = await queryRunner.manager.save(
                queryRunner.manager.create(AuthUser,{
                    username,
                    password: password,
                    profile_id: newProfile,
                    email: email,
                })
            );

            await queryRunner.commitTransaction();
            return {
                message: 'Success',
                username: newUser.username,
                profile_id: newProfile.id,
            };
        } catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            return {
                message: 'Error',
                error: error.message,
            };
        }finally {
            await queryRunner.release();
        }
    }

    async deleteUser(id) {
        const result = await profileRepository.delete({id: id});

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
