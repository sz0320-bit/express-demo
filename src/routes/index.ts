
import { Router } from 'express';

const router = Router();

// Define your routes here, e.g.
const users = require('./user');
const auth = require('./auth');
const posts = require('./post');
const comments = require('./comment');



router.use(users.default);
router.use(auth.default);
router.use(posts.default);
router.use(comments.default);


export default router;
