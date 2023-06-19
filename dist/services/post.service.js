"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_data_source_1 = __importDefault(require("../app-data-source"));
const dislike_1 = require("../entities/dislike");
const like_1 = require("../entities/like");
const post_1 = require("../entities/post");
const user_1 = require("../entities/user");
const postRepository = app_data_source_1.default.manager.getRepository(post_1.Post);
const userRepository = app_data_source_1.default.manager.getRepository(user_1.User);
const likeRepository = app_data_source_1.default.manager.getRepository(like_1.Like);
const dislikeRepository = app_data_source_1.default.manager.getRepository(dislike_1.Dislike);
class UserService {
    async getPostsById(id) {
        const user = await userRepository.findOne({
            where: {
                id,
            },
            relations: ["posts"],
        });
        return user.posts || [];
    }
    async getPosts() {
        const posts = await postRepository.find({
            relations: ["likes", "dislikes"],
        });
        return posts || [];
    }
    async addLike({ postId, userId, username }) {
        const queryRunner = app_data_source_1.default.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let post = await postRepository.findOne({
                where: {
                    id: postId,
                },
                relations: ["likes", "dislikes"],
            });
            if (!post) {
                throw new Error("Post not found");
            }
            console.log(post);
            const existingLike = post.likes.find((like) => like.userId === userId);
            if (existingLike) {
                throw new Error("User already liked this post");
            }
            const existingDislike = post.dislikes.find((dislike) => dislike.userId === userId);
            if (existingDislike) {
                await queryRunner.manager.delete(dislike_1.Dislike, {
                    userId: userId,
                    post: Number.parseInt(postId),
                });
            }
            const newLike = new like_1.Like();
            newLike.userId = userId;
            newLike.username = username;
            newLike.post = post;
            await queryRunner.manager.save(queryRunner.manager.create(like_1.Like, newLike));
            await queryRunner.commitTransaction();
            post = await postRepository.findOne({
                where: {
                    id: postId,
                },
                relations: ["dislikes", "likes"],
            });
            return post;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error(error);
            throw new Error(error.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async removeDislike({ postId, userId, username }) {
        const queryRunner = app_data_source_1.default.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.delete(dislike_1.Dislike, {
                userId: userId,
                post: Number.parseInt(postId),
            });
            queryRunner.commitTransaction();
            let post = await postRepository.findOne({
                where: {
                    id: postId,
                },
                relations: ["dislikes", "likes"],
            });
            return post;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error(error);
            throw new Error(error.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async removeLike({ postId, userId, username }) {
        const queryRunner = app_data_source_1.default.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.delete(like_1.Like, {
                userId: userId,
                post: Number.parseInt(postId),
            });
            queryRunner.commitTransaction();
            let post = await postRepository.findOne({
                where: {
                    id: postId,
                },
                relations: ["dislikes", "likes"],
            });
            return post;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error(error);
            throw new Error(error.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async addDislike({ postId, userId, username }) {
        const queryRunner = app_data_source_1.default.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let post = await postRepository.findOne({
                where: {
                    id: postId,
                },
                relations: ["dislikes", "likes"],
            });
            if (!post) {
                throw new Error("Post not found");
            }
            console.log(post);
            const existingDislike = post.dislikes.find((like) => like.userId === userId);
            if (existingDislike) {
                throw new Error("User already disliked this post");
            }
            const existingLike = post.likes.find((like) => like.userId === userId);
            if (existingLike) {
                await queryRunner.manager.delete(like_1.Like, {
                    userId: userId,
                    post: Number.parseInt(postId),
                });
            }
            const newDislike = new dislike_1.Dislike();
            newDislike.userId = userId;
            newDislike.username = username;
            newDislike.post = post;
            await queryRunner.manager.save(queryRunner.manager.create(dislike_1.Dislike, newDislike));
            await queryRunner.commitTransaction();
            post = await postRepository.findOne({
                where: {
                    id: postId,
                },
                relations: ["dislikes", "likes"],
            });
            return post;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error(error);
            throw new Error(error.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async addPost(payload) {
        if (!payload.username ||
            !payload.userId ||
            !payload.title ||
            !payload.desc) {
            throw new Error("Values are required.");
        }
        try {
            const newPost = {
                username: payload.username,
                user: payload.userId,
                description: payload.desc,
                title: payload.title,
                date_created: new Date(),
                date_updated: new Date(),
                likes: [],
                dislikes: [],
            };
            if (payload.tags) {
                newPost.tags = payload.tags;
            }
            const result = await postRepository.save(postRepository.create(newPost));
            delete result.user;
            return result;
        }
        catch (error) {
            console.log(error);
            return {
                message: "Error",
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
            throw new Error("No post found with that ID.");
        }
    }
}
exports.default = new UserService();
