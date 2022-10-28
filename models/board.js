import prismaClient from './prismaClient.js';
export const BoardType = {
  NOTICE: 'notice',
  FREE: 'free',
  OPERATION: 'operation',
};

const includeUser = {
  user: {
    select: {
      id: true,
      userId: true,
      nickname: true,
      role: true,
    },
  },
};

const createPost = async (title, content, boardType, userId) => {
  await prismaClient.board.create({
    data: {
      title,
      content,
      boardType,
      user: { connect: { id: userId } },
    },
  });
};

const findById = async id => {
  return await prismaClient.board.findUnique({
    where: {
      id: parseInt(id),
    },
    include: includeUser,
  });
};

const updatePost = async (id, updateData) => {
  await prismaClient.board.update({
    where: {
      id: parseInt(id),
    },
    data: updateData,
  });
};

const deletePost = async id => {
  await prismaClient.board.delete({
    where: {
      id: parseInt(id),
    },
  });
};

const getFreePosts = async () => {
  return await prismaClient.board.findMany({
    where: {
      boardType: BoardType.FREE,
    },
    include: includeUser,
  });
};

const getNoticePosts = async () => {
  return await prismaClient.board.findMany({
    where: {
      boardType: BoardType.NOTICE,
    },
    include: includeUser,
  });
};

const getOperationPosts = async () => {
  return await prismaClient.board.findMany({
    where: {
      boardType: BoardType.OPERATION,
    },
    include: includeUser,
  });
};

export default {
  createPost,
  updatePost,
  findById,
  deletePost,
  getFreePosts,
  getNoticePosts,
  getOperationPosts,
};
