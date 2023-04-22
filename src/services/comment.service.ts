import myDataSource from "../app-data-source";
import {User} from "../entities/user";
import {Comment} from "../entities/comment";
import {Post} from "../entities/post";

const commentRepository = myDataSource.manager.getRepository(Comment);
const userRepository = myDataSource.manager.getRepository(User);
const postRepository = myDataSource.manager.getRepository(Post);

class CommentService {
    async getCommentsByUserId(id) {
        const user = await userRepository.findOne({
            where: {
                id
            },
            relations: ['comments']
        });
        return user.comments || [];
    }

    async getCommentsByPostId(id) {
        const post = await postRepository.findOne({
            where: {
                id
            },
            relations: ['comments']
        });
        return post.comments || [];
    }

    async addComment({username, userId, message, postId}) {
        if (!username || !userId || !message || !postId) {
            throw new Error('Values are required.');
        }

        try {
            const newPost = await commentRepository.save(
                commentRepository.create({
                    username: username,
                    user: userId,
                    post: postId,
                    message: message,
                    date_created: new Date(),
                    date_updated: new Date(),
                })
            );


            return {
                message: 'Success',
                post: newPost.post,
                comment: newPost.id,
            };
        } catch (error) {
            console.log(error);
            return {
                message: 'Error',
                error: error.message,
            };
        }
    }

    async deleteComment(id) {
        const result = await commentRepository.delete({id: id});

        if (result.affected) {
            return `Successfully deleted post ${id}.`;
        } else {
            throw new Error('No post found with that ID.');
        }
    }

}

export default new CommentService();