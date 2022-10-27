import prismaClient from './prismaClient.js';

export const createComment = async (userId, boardId, content) => {
  return await prismaClient.comment.create({
    data: {
      user_id: userId,
      board_id: boardId,
      content,
    },
  });
};
