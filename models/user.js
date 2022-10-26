import prismaClient from './prismaClient.js';
import dayjs from 'dayjs';
export const getUserById = async id => {
  return await prismaClient.user.findUnique({ where: { user_id: id } });
};

export const getUserByNickname = async nickname => {
  return await prismaClient.user.findUnique({ where: { nickname } });
};

export const getUserByPhoneNumber = async phonbeNumber => {
  return await prismaClient.user.findUnique({
    where: { phone_number: phonbeNumber },
  });
};

export const createUser = async ({
  id,
  hashedPassword,
  gender,
  nickname,
  birth,
  phone_number,
}) => {
  // const newBirth = new Date(birth).toISOString().slice(0, 19).replace('T', ' ');
  const newBirth = dayjs(birth).toDate();
  return await prismaClient.user.create({
    data: {
      user_id: id,
      password: hashedPassword,
      gender,
      nickname,
      birth: newBirth,
      phone_number,
    },
  });
};
