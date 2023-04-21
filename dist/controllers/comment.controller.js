"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.addComment = exports.getCommentsByUserId = exports.getCommentsByPostId = void 0;
const comment_service_1 = __importDefault(require("../services/comment.service"));
const getCommentsByPostId = async (req, res) => {
    console.log(req.params.id);
    try {
        const comments = await comment_service_1.default.getCommentsByPostId(req.params.id);
        res.status(200).send(comments);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getCommentsByPostId = getCommentsByPostId;
const getCommentsByUserId = async (req, res) => {
    console.log(req.params.id);
    try {
        const comments = await comment_service_1.default.getCommentsByUserId(req.params.id);
        res.status(200).send(comments);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getCommentsByUserId = getCommentsByUserId;
const addComment = async (req, res) => {
    const { username, userId, message, postId } = req.body;
    try {
        const newComment = await comment_service_1.default.addComment(req.body);
        res.status(201).send(newComment);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.addComment = addComment;
const deleteComment = async (req, res) => {
    try {
        const message = await comment_service_1.default.deleteComment(req.params.id);
        res.status(200).send(message);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deleteComment = deleteComment;
