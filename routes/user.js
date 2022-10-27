import express from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.js';
import { validate } from '../middleware/validator.js';
const router = express.Router();
const validateCredeital = [
  body('id')
    .notEmpty()
    .withMessage('아이디를 입력해주세요.')
    .trim()
    .isLength({ min: 7, max: 15 })
    .withMessage('아이디를 올바른 형식으로 작성해주세요.'),
  body('password')
    .notEmpty()
    .withMessage('비밀번호를 입력해주세요.')
    .trim()
    .matches(
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{10,20}$/
    )
    .withMessage('비밀번호를 올바른 형식으로 입력해주세요.'),
  body('nickname')
    .notEmpty()
    .withMessage('닉네임을 입력해주세요.')
    .trim()
    .matches(/^([ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]).{7,15}$/)
    .withMessage('닉네임을 올바른 형식으로 입력해주세요.'),
  body('birth')
    .notEmpty()
    .withMessage('생년월일을 입력해주세요.')
    .isDate()
    .withMessage('생년월일을 올바른 형식으로 입력해주세요.'),
  body('phone_number')
    .notEmpty()
    .withMessage('핸드폰 번호를 입력해주세요.')
    .matches(/^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/)
    .withMessage('핸드폰 번호를 올바른 형식으로 입력해주세요.'),
  validate,
];
// 회원 가입
router.post('/register', validateCredeital, userController.createUser);
// 로그인
router.post('/login', userController.login);

export default router;
