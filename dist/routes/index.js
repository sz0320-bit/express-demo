"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Define your routes here, e.g.
const users = require('./user');
const auth = require('./auth');
const posts = require('./post');
const comments = require('./comment');
router.use(users.default);
router.use(auth.default);
router.use(posts.default);
router.use(comments.default);
exports.default = router;
