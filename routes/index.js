import boardRouter from './board.js';
import express from 'express';
import commentRouter from './comment.js';
import statisticsRouter from './statistics.js';

const router = express.Router();

router.use(commentRouter);
router.use('/statistics', statisticsRouter);
router.use('/board', boardRouter);

export default router;
