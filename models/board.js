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
      user_id: true,
      nickname: true,
      role: true,
    },
  },
};

async function createPost(title, content, boardType, userId) {
  await prismaClient.board.create({
    data: {
      title,
      content,
      board_type: boardType,
      user: { connect: { id: userId } },
    },
  });
}

async function findById(id) {
  return await prismaClient.board.findUnique({
    where: {
      id: parseInt(id),
    },
    include: includeUser,
  });
}

async function updatePost(id, updateData) {
  await prismaClient.board.update({
    where: {
      id: parseInt(id),
    },
    data: updateData,
  });
}

async function deletePost(id) {
  await prismaClient.board.delete({
    where: {
      id: parseInt(id),
    },
  });
}

async function getFreePosts() {
  return await prismaClient.board.findMany({
    where: {
      board_type: BoardType.FREE,
    },
    include: includeUser,
  });
}

async function getNoticePosts() {
  return await prismaClient.board.findMany({
    where: {
      board_type: BoardType.NOTICE,
    },
    include: includeUser,
  });
}

async function getOperationPosts() {
  return await prismaClient.board.findMany({
    where: {
      board_type: BoardType.OPERATION,
    },
    include: includeUser,
  });
}

export default {
  createPost,
  updatePost,
  findById,
  deletePost,
  getFreePosts,
  getNoticePosts,
  getOperationPosts,
};
