import express, {Router} from 'express';
import {Request, Response} from 'express';
import {authenticateAccessToken} from "../middleware/jwt";
import {addComment, deleteComment, getCommentsByPostId} from "../controllers/comment.controller";

// Create a new router instance
const router: Router = express.Router();

// Define routes
router.get('/comments/:id', authenticateAccessToken, (req: Request, res: Response) => getCommentsByPostId(req, res));
router.post('/comments', authenticateAccessToken, (req: Request, res: Response) => addComment(req, res));
router.delete('/comments/:id', authenticateAccessToken, (req: Request, res: Response) => deleteComment(req, res));

export default router;