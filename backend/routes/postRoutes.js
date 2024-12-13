import express from 'express';
const postRouter = express.Router();
import { createPost } from '../posts/postControl.js';
// import { verifyToken } from './middleware/authMiddleware.js'; // Ensure token middleware is applied


postRouter.post('/new', createPost);

export default postRouter;
