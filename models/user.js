import prismaClient from './prismaClient.js';

export const getUserById = async id => {
  return await prismaClient.user.findUnique({ where: { user_id: id } });
};

export const createUser = async ({
  id,
  hashedPassword,
  gender,
  nickname,
  birth,
  phone_number,
}) => {
  return await prismaClient.user.create({
    data: {
      user_id: id,
      password: hashedPassword,
      gender,
      nickname,
      birth,
      phone_number,
    },
  });
};
