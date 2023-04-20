
import { Router } from 'express';

const router = Router();

// Define your routes here, e.g.
const users = require('./user');
const auth = require('./auth');
const posts = require('./post');


router.use(users.default);
router.use(auth.default);
router.use(posts.default);

export default router;
