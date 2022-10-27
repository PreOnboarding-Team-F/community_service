import boardRouter from './board.js';
import express from 'express';
import commentRouter from './comment.js';

const router = express.Router();

router.use(commentRouter);
router.use('/board', boardRouter);

export default router;
