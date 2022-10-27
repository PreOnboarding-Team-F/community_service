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

export const getCommentList = async boardId => {
  return await prismaClient.comment.findMany({
    where: {
      AND: [
        {
          board_id: boardId,
        },
        {
          parent_id: 0,
        },
      ],
    },
    select: {
      board_id: true,
      content: true,
      user: {
        select: {
          nickname: true,
        },
      },
    },
  });
};

// export const getUserById = async (boardId, commentId) => {
//   return await prismaClient.comment.findUnique({
//     where: {
//       AND: [
//         {
//           id: commentId,
//         },
//         {
//           board_id: boardId,
//         },
//       ],
//     },
//     select: {
//       user_id: true,
//     },
//   });
// };

export const updateComment = async (commentId, content) => {
  return await prismaClient.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: content,
    },
  });
};

export const deleteComment = async (userId, boardId, commentId) => {
  return await prismaClient.comment.delete({
    where: {
      id: commentId,
    },
  });
};
