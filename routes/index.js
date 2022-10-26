import boardRouter from './board.js';
import express from 'express';

const router = express.Router();

router.use('/board', boardRouter);

export default router;
