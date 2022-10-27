import express from 'express';
import * as commentController from '../controllers/comment.js';

const router = express.Router();

router.post('/comment/post', commentController.createComment);

export default router;
