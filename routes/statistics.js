import express from 'express';
import * as statisticsController from '../controllers/statistics.js';

const router = express.Router();
router.get('/gender', statisticsController.getGender);
router.get('/age', statisticsController.getAge);

export default router;
