import prismaClient from './prismaClient.js';
export const BoardType = {
  NOTICE: 'notice',
  FREE: 'free',
  OPERATION: 'operation',
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

async function updatePost(id, updateData) {
  await prismaClient.board.update({
    where: {
      id: parseInt(id),
    },
    data: updateData,
  });
}

async function findById(id) {
  return await prismaClient.board.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      title: true,
      content: true,
      board_type: true,
      image_url: true,
      user: {
        select: {
          id: true,
          user_id: true,
          nickname: true,
          role: true,
        },
      },
    },
  });
}

export default {
  createPost,
  updatePost,
  findById,
};
