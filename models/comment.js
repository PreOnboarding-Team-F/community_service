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

export const createNestComment = async (userId, boardId, content, parentId) => {
  return await prismaClient.comment.create({
    data: {
      user_id: userId,
      board_id: boardId,
      content,
      parent_id: parentId,
    },
  });
};

export const getPostById = async boardId => {
  return await prismaClient.board.findUnique({
    where: {
      id: boardId,
    },
  });
};
