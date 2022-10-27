import boardRouter from './board.js';
import express from 'express';
import statisticsRouter from './statistics.js';

const router = express.Router();

router.use("/statistics",statisticsRouter);
router.use('/board', boardRouter);

export default router;
