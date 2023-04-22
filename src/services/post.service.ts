import myDataSource from "../../app-data-source";
import {Post} from "../entities/post";
import {User} from "../entities/user";
import {DeepPartial} from "typeorm";

const postRepository = myDataSource.manager.getRepository(Post);
const userRepository = myDataSource.manager.getRepository(User);

class UserService {
    async getPostsById(id) {
        const user = await userRepository.findOne({
            where: {
                id
            },
            relations: ['posts']
        });
        return user.posts || [];
    }

    async addPost({username, userId, title, desc, tags}) {
        if (!username || !userId || !title || !desc) {
            throw new Error('Values are required.');
        }

        try {
            const newPost: DeepPartial<Post> = {
                username: username,
                user: userId,
                description: desc,
                title: title,
                date_created: new Date(),
                date_updated: new Date(),
            }

            if(tags){
                newPost.tags = tags;
            }

            await postRepository.save(
                postRepository.create(newPost)
            );

            return {
                message: 'Success',
                name: newPost.title,
                id: newPost.id,
            };
        } catch (error) {
            console.log(error);
            return {
                message: 'Error',
                error: error.message,
            };
        }
    }

    async deletePost(id) {
        const result = await postRepository.delete({id: id});

        if (result.affected) {
            return `Successfully deleted post ${id}.`;
        } else {
            throw new Error('No post found with that ID.');
        }
    }

}

export default new UserService();