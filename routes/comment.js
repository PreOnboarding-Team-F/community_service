import express from 'express';
import * as commentController from '../controllers/comment.js';

const router = express.Router();

router.post('/comment/post', commentController.createComment);
router.get('/comment/post', commentController.getCommentList);
router.patch('/comment/post', commentController.updateComment);
router.delete('/comment/post', commentController.deleteComment);
export default router;
