"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../middleware/jwt");
const post_controller_1 = require("../controllers/post.controller");
// Create a new router instance
const router = express_1.default.Router();
// Define routes
router.get('/posts/:id', jwt_1.authenticateAccessToken, (req, res) => (0, post_controller_1.getPostsById)(req, res));
router.post('/posts', jwt_1.authenticateAccessToken, (req, res) => (0, post_controller_1.addPost)(req, res));
router.patch('/posts/:id/like', jwt_1.authenticateAccessToken, (req, res) => (0, post_controller_1.likePost)(req, res));
router.patch('/posts/:id/dislike', jwt_1.authenticateAccessToken, (req, res) => (0, post_controller_1.dislikePost)(req, res));
router.patch('/posts/:id/removeDislike', jwt_1.authenticateAccessToken, (req, res) => (0, post_controller_1.removeDislike)(req, res));
router.patch('/posts/:id/removeLike', jwt_1.authenticateAccessToken, (req, res) => (0, post_controller_1.removeLike)(req, res));
router.get('/posts', jwt_1.authenticateAccessToken, (req, res) => (0, post_controller_1.getPosts)(req, res));
router.delete('/posts/:id', jwt_1.authenticateAccessToken, (req, res) => (0, post_controller_1.deletePost)(req, res));
exports.default = router;
