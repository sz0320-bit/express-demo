import express, { Router } from 'express';
import { Request, Response } from 'express';
import {getUserById, deleteUser, getAllUsers, addUser} from '../controllers/user.controller';

// Create a new router instance
const router: Router = express.Router();

// Define routes
router.get('/user/:id', (req: Request, res: Response) => getUserById(req, res));
router.get('/users', (req: Request, res: Response) => getAllUsers(req, res));

router.post('/user', (req: Request, res: Response) => addUser(req, res));
router.delete('/user/:id', (req: Request, res: Response) => deleteUser(req, res));

export default router;
