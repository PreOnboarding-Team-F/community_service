import prismaClient from './prismaClient.js';

export const createVisitLog = async id => {
  return await prismaClient.visit_log.create({
    data: {
      user_id: id,
    },
  });
};
