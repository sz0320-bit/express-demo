"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const jwt_1 = require("../middleware/jwt");
// Create a new router instance
const router = express_1.default.Router();
// Define routes
router.get('/users/:id', jwt_1.authenticateAccessToken, (req, res) => (0, user_controller_1.getUserById)(req, res));
router.get('/users', jwt_1.authenticateAccessToken, (req, res) => (0, user_controller_1.getAllUsers)(req, res));
router.post('/users', (req, res) => (0, user_controller_1.addUser)(req, res));
router.delete('/users/:id', jwt_1.authenticateAccessToken, (req, res) => (0, user_controller_1.deleteUser)(req, res));
exports.default = router;
