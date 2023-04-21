"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_data_source_1 = __importDefault(require("../app-data-source"));
const user_1 = require("../entities/user");
const comment_1 = require("../entities/comment");
const post_1 = require("../entities/post");
const commentRepository = app_data_source_1.default.manager.getRepository(comment_1.Comment);
const userRepository = app_data_source_1.default.manager.getRepository(user_1.User);
const postRepository = app_data_source_1.default.manager.getRepository(post_1.Post);
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
    async addComment({ username, userId, message, postId }) {
        if (!username || !userId || !message || !postId) {
            throw new Error('Values are required.');
        }
        try {
            const newPost = await commentRepository.save(commentRepository.create({
                username: username,
                user: userId,
                post: postId,
                message: message,
                date_created: new Date(),
                date_updated: new Date(),
            }));
            return {
                message: 'Success',
                post: newPost.post,
                comment: newPost.id,
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
    async deleteComment(id) {
        const result = await commentRepository.delete({ id: id });
        if (result.affected) {
            return `Successfully deleted post ${id}.`;
        }
        else {
            throw new Error('No post found with that ID.');
        }
    }
}
exports.default = new CommentService();
