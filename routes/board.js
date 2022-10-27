import boardController from '../controllers/board.js';
import { body } from 'express-validator';
import express from 'express';
import { validate } from '../middleware/validate.js';
const router = express.Router();

const validateCreatePost = [
  body('boardType')
    .trim()
    .custom(value => {
      if (value === 'notice' || value === 'free' || value === 'operation')
        return true;
    })
    .withMessage('boardType이 유효하지 않습니다.'),
  body('title').notEmpty().withMessage('title을 입력해 주세요.'),
  body('content').notEmpty().withMessage('content를 입력해 주세요'),
  validate,
];
router.post('/post', validateCreatePost, boardController.createPost);
router.get('/free/:id', boardController.getFreePost);
router.get('/notice/:id', boardController.getNoticePost);
router.get('/operation/:id', boardController.getOperationPost);
export default router;
