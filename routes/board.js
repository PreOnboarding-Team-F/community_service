import boardController from '../controllers/board.js';
import express from 'express';
const router = express.Router();

router.post('/post', boardController.createPost);
router.get('/free/:id', boardController.getFreePost);

export default router;
