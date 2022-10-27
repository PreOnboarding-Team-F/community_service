import express from 'express';
import boardRouter from './board.js';
import commentRouter from './comment.js';
import statisticsRouter from './statistics.js';
import userRouter from './user.js';

const router = express.Router();

router.use('/user', userRouter);
router.use(commentRouter);
router.use('/statistics', statisticsRouter);
router.use('/board', boardRouter);

export default router;
