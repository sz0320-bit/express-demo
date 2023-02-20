import express, { Router } from 'express';
import { Request, Response } from 'express';
import AuthService from "../services/auth.service";
import {limiter} from "../middleware/rate-limiter";
import {login} from "../controllers/auth.controller";
// Create a new router instance
const router: Router = express.Router();

// Define routes
router.post('/login', limiter, login);
export default router;
