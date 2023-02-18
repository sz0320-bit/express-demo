
import { Router } from 'express';

const router = Router();

// Define your routes here, e.g.
const users = require('./user');

router.use(users.default);

export default router;
