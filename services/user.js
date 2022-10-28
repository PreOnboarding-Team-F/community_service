import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../models/user.js';
import * as visitLogRepository from '../models/visitLog.js';
import { BadRequestException } from '../util/exception/index.js';

export const createUser = async userInfo => {
  const { id, password, gender, nickname, birth, phone_number } = userInfo;
  const isExistId = await userRepository.getUserByUserId(id);
  const isExistNickname = await userRepository.getUserByNickname(nickname);
  const isExistPhoneNumber = await userRepository.getUserByPhoneNumber(
    phone_number
  );

  if (isExistId) {
    throw new BadRequestException('이미 존재하는 아이디입니다.');
  }
  if (isExistNickname) {
    throw new BadRequestException('이미 존재하는 닉네임입니다.');
  }
  if (isExistPhoneNumber) {
    throw new BadRequestException('이미 존재하는 핸드폰 번호입니다.');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return await userRepository.createUser({
    id,
    hashedPassword,
    gender,
    nickname,
    birth,
    phone_number,
  });
};

export const login = async (id, password) => {
  const user = await userRepository.getUserByUserId(id);
  if (!user) {
    throw new BadRequestException('아이디와 패스워드를 확인해주세요.');
  }

  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    throw new BadRequestException('아이디와 패스워드를 확인해주세요.');
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.SECRET_KEY
  );

  // 방문 로그는 로그인 할 때마다 생성되도록 구현
  await visitLogRepository.createVisitLog(user.id);

  return token;
};

export const deleteUser = async id => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new BadRequestException('잘못된 접근입니다.');
  }
  return await userRepository.deleteUser(id);
};
