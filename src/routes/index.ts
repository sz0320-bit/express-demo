
import { Router } from 'express';

const router = Router();

// Define your routes here, e.g.
const users = require('./user');
const auth = require('./auth');


router.use(users.default);
router.use(auth.default);


export default router;
