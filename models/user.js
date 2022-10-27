import dayjs from 'dayjs';
import prismaClient from './prismaClient.js';
export const getUserByUserId = async id => {
  return await prismaClient.user.findUnique({ where: { user_id: id } });
};

export const getUserById = async id => {
  return await prismaClient.user.findUnique({ where: { id } });
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

export const deleteUser = async id => {
  const deletedAt = dayjs(new Date()).toDate();
  return await prismaClient.user.update({
    where: { id },
    data: {
      user_id: 'null',
      phone_number: 'null',
      birth: 'null',
      deleted_at: deletedAt,
    },
  });
};
