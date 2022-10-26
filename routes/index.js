import express from 'express';
import * as statisticsController from '../controllers/statistics.js'
const router = express.Router();

router.get("/statistics/gender",statisticsController.getGender);

export default router;
