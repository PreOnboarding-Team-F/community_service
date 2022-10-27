import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../models/user.js';
import { BadRequestException } from '../util/badRequest.exception.js';

export const createUser = async userInfo => {
  const { id, password, gender, nickname, birth, phone_number } = userInfo;
  const isExistId = await userRepository.getUserById(id);
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