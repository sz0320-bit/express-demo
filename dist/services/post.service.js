"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_data_source_1 = __importDefault(require("../app-data-source"));
const post_1 = require("../entities/post");
const postRepository = app_data_source_1.default.manager.getRepository(post_1.Post);
class UserService {
    async getPostsById(id) {
        const posts = await postRepository.find({
            where: {
                user: id
            }
        });
        return posts || [];
    }
    async addPost({ username, userId, title, desc }) {
        if (!username || !userId || !title || !desc) {
            throw new Error('Values are required.');
        }
        try {
            const newPost = await postRepository.save(postRepository.create({
                username: username,
                user: userId,
                description: desc,
                title: title,
                date_created: new Date(),
                date_updated: new Date(),
            }));
            return {
                message: 'Success',
                username: newPost.title,
                profile_id: newPost.id,
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
    async deletePost(id) {
        const result = await postRepository.delete({ id: id });
        if (result.affected) {
            return `Successfully deleted post ${id}.`;
        }
        else {
            throw new Error('No post found with that ID.');
        }
    }
}
exports.default = new UserService();
