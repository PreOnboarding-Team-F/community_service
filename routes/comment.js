import express from 'express';
import * as commentController from '../controllers/comment.js';
import { isLogin } from '../middleware/auth.js';

const router = express.Router();

router.post('/post', commentController.createComment);
router.get('/post', commentController.getCommentList);
router.patch('/post', isLogin, commentController.updateComment);
router.delete('/post', isLogin, commentController.deleteComment);

export default router;
