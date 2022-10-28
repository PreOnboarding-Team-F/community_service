import {
  checkCreatePermissions,
  checkGetOperationPermission,
} from '../middleware/permission/board.js';

import boardController from '../controllers/board.js';
import { body } from 'express-validator';
import express from 'express';
import { isLogin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const validateBoardType = value => {
  if (value === 'notice' || value === 'free' || value === 'operation')
    return true;
};

const validateCreatePost = [
  body('boardType')
    .trim()
    .custom(validateBoardType)
    .withMessage('boardType이 유효하지 않습니다.'),
  body('title').notEmpty().withMessage('title을 입력해 주세요.'),
  body('content').notEmpty().withMessage('content를 입력해 주세요'),
  validate,
];

router.post(
  '/post',
  validateCreatePost,
  isLogin,
  checkCreatePermissions,
  boardController.createPost
);
router.get(
  '/operation/:id',
  isLogin,
  checkGetOperationPermission,
  boardController.getOperationPost
);
router.get('/free/:id', boardController.getFreePost);
router.get('/notice/:id', boardController.getNoticePost);
router.patch('/post/:id', isLogin, boardController.updatePost);
router.delete('/post/:id', isLogin, boardController.deletePost);
router.get('/free', boardController.getFreePosts);
router.get('/notice', boardController.getNoticePosts);
router.get(
  '/operation',
  isLogin,
  checkGetOperationPermission,
  boardController.getOperationPosts
);
export default router;
