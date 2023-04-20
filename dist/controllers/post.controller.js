"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.addPost = exports.getPostsById = void 0;
const post_service_1 = __importDefault(require("../services/post.service"));
const getPostsById = async (req, res) => {
    console.log(req.params.id);
    try {
        const posts = await post_service_1.default.getPostsById(req.params.id);
        res.status(200).send(posts);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getPostsById = getPostsById;
const addPost = async (req, res) => {
    const { username, userId, title, desc } = req.body;
    try {
        const newPost = await post_service_1.default.addPost(req.body);
        res.status(201).send(newPost);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.addPost = addPost;
const deletePost = async (req, res) => {
    try {
        const message = await post_service_1.default.deletePost(req.params.id);
        res.status(200).send(message);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deletePost = deletePost;
