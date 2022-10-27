import express from 'express';
import statisticsRouter from './statistics.js';

const router = express.Router();

router.use("/statistics",statisticsRouter);

export default router;
