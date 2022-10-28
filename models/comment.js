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

export const getCommentById = async commentId => {
  return await prismaClient.comment.findUnique({
    where: {
      id: commentId,
    },
  });
};

export const getCommentByParentId = async commentId => {
  return await prismaClient.$queryRaw`
    SELECT EXISTS(
      SELECT
        parent_id
      FROM comment
      WHERE parent_id = ${commentId}
    )
  `;
};

export const getCommentList = async boardId => {
  return await prismaClient.$queryRaw`
    SELECT
      c.id commentId,
      u.nickname nickname,
      c.content content
    FROM comment c
    INNER JOIN user u ON u.id = c.user_id
    WHERE c.board_id = ${boardId}
    ORDER BY c.created_at DESC
  `;
};

export const getNextCommentList = async (boardId, commentId) => {
  return await prismaClient.$queryRaw`
    SELECT 
      c.id commentId,
      c.parent_id parentId,
      u.nickname nickname,
      c.content content
    FROM comment c
    INNER JOIN user u ON u.id = c.user_id
    WHERE c.board_id = ${boardId} AND c.parent_id = ${commentId}
    ORDER BY c.created_at DESC
  `;
};

export const updateComment = async (userId, commentId, content) => {
  return await prismaClient.$queryRaw`
    UPDATE
      comment
    SET
      content = ${content}
    WHERE id = ${commentId} AND user_id = ${userId}
    `;
};

export const getUserByComment = async (userId, commentId) => {
  return await prismaClient.$queryRaw`
    SELECT EXISTS(
      SELECT
        id
      FROM comment
      WHERE id = ${commentId} AND user_id = ${userId}
    )
  `;
};

export const deleteComment = async (commentId, boardId) => {
  return await prismaClient.$queryRaw`
    DELETE 
    FROM comment
    WHERE id = ${commentId} AND board_id = ${boardId}
  `;
};

export const leaveComment = async (commentId, boardId) => {
  return await prismaClient.$queryRaw`
    UPDATE
      comment
    SET 
      content = '삭제된 댓글 입니다.'
    WHERE id = ${commentId} AND board_id = ${boardId}
  `;
};
