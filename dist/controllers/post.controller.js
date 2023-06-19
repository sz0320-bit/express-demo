"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.addPost = exports.likePost = exports.getPosts = exports.getPostsById = void 0;
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
const getPosts = async (req, res) => {
    try {
        const posts = await post_service_1.default.getPosts();
        res.status(200).send(posts);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getPosts = getPosts;
const likePost = async (req, res) => {
    const postId = req.params.id;
    if (!postId) {
        res.status(400).send('no id passed');
    }
    console.log(postId);
    const user = req.user.payload;
    const payload = {
        username: user.sub.username,
        userId: user.sub.id,
        postId: postId,
    };
    try {
        const newPost = await post_service_1.default.addLike(payload);
        res.status(201).send(newPost);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};
exports.likePost = likePost;
const addPost = async (req, res) => {
    const { title, desc } = req.body;
    const user = req.user.payload;
    console.log(user);
    const payload = {
        username: user.sub.username,
        userId: user.sub.id,
        title: title,
        desc: desc,
    };
    try {
        const newPost = await post_service_1.default.addPost(payload);
        res.status(201).send(newPost);
    }
    catch (error) {
        res.status(400).send(error.message);
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
