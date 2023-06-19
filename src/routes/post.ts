import express, {Router} from 'express';
import {Request, Response} from 'express';
import {authenticateAccessToken} from "../middleware/jwt";
import {addPost, deletePost, getPosts, getPostsById, likePost} from "../controllers/post.controller";

// Create a new router instance
const router: Router = express.Router();

// Define routes

router.get('/posts/:id', authenticateAccessToken, (req: Request, res: Response) => getPostsById(req, res));
router.post('/posts', authenticateAccessToken, (req: Request, res: Response) => addPost(req, res));
router.patch('/posts/:id/like', authenticateAccessToken, (req: Request, res: Response) => likePost(req, res));
router.get('/posts', authenticateAccessToken, (req: Request, res: Response) => getPosts(req, res));
router.delete('/posts/:id', authenticateAccessToken, (req: Request, res: Response) => deletePost(req, res));

export default router;