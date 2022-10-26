import prismaClient from './prismaClient.js';
const BoardType = {
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

export default {
  BoardType,
  createPost,
};
