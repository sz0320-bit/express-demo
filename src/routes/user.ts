import express, {Router} from 'express';
import {Request, Response} from 'express';
import {getUserById, deleteUser, getAllUsers, addUser} from '../controllers/user.controller';
import {authenticateAccessToken} from "../middleware/jwt";

// Create a new router instance
const router: Router = express.Router();

// Define routes
router.get('/users/:id', authenticateAccessToken, (req: Request, res: Response) => getUserById(req, res));
router.get('/users', authenticateAccessToken, (req: Request, res: Response) => getAllUsers(req, res));

router.post('/users', (req: Request, res: Response) => addUser(req, res));
router.delete('/users/:id', authenticateAccessToken, (req: Request, res: Response) => deleteUser(req, res));

export default router;
