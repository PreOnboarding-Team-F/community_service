import express from 'express';
import * as statisticsController from '../controllers/statistics.js';

const router = express.Router();

router.get('/gender', statisticsController.getGender);
router.get('/age', statisticsController.getAge);
router.get('/accesstime', statisticsController.getAccesstime);
router.get('/visit', statisticsController.getVisit);

export default router;
