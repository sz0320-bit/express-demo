"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../middleware/jwt");
const comment_controller_1 = require("../controllers/comment.controller");
// Create a new router instance
const router = express_1.default.Router();
// Define routes
router.get('/comments/:id', jwt_1.authenticateAccessToken, (req, res) => (0, comment_controller_1.getCommentsByPostId)(req, res));
router.post('/comments', jwt_1.authenticateAccessToken, (req, res) => (0, comment_controller_1.addComment)(req, res));
router.delete('/comments/:id', jwt_1.authenticateAccessToken, (req, res) => (0, comment_controller_1.deleteComment)(req, res));
exports.default = router;
