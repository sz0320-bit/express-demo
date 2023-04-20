"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rate_limiter_1 = require("../middleware/rate-limiter");
const auth_controller_1 = require("../controllers/auth.controller");
// Create a new router instance
const router = express_1.default.Router();
// Define routes
router.post('/login', rate_limiter_1.limiter, auth_controller_1.login);
router.post('/refresh', rate_limiter_1.limiter, auth_controller_1.refresh);
exports.default = router;
