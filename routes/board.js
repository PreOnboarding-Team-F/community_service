import boardController from '../controllers/board.js';
import express from 'express';
const router = express.Router();

router.post('/post', boardController.createPost);
router.get('/free/:id', boardController.getFreePost);
router.get('/notice/:id', boardController.getNoticePost);
router.get('/operation/:id', boardController.getOperationPost);
export default router;
