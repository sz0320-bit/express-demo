import express, { Router } from 'express';
import { Request, Response } from 'express';
import { getUserById, updateUser, deleteUser } from '../controllers/user.controller';

// Create a new router instance
const router: Router = express.Router();

// Define routes
router.get('/user/:id', (req: Request, res: Response) => getUserById(req, res));
router.put('/user/:id', (req: Request, res: Response) => updateUser(req, res));
router.delete('/user/:id', (req: Request, res: Response) => deleteUser(req, res));

export default router;
