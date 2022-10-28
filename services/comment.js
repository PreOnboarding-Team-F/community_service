import * as commentDao from '../models/comment.js';
import { NotFoundException } from '../util/exception/index.js';
import { UnauthorizedException } from '../util/exception/index.js';

export const createComment = async (userId, boardId, content, parentId) => {
  const isExistPost = await commentDao.getPostById(boardId);
  if (!isExistPost) {
    throw new NotFoundException('게시글이 존재하지 않습니다.');
  }

  if (parentId) {
    return await commentDao.createNestComment(
      userId,
      boardId,
      content,
      parentId
    );
  }

  return await commentDao.createComment(userId, boardId, content);
};

export const getCommentList = async (boardId, commentId) => {
  const isExistPost = await commentDao.getPostById(boardId);
  if (!isExistPost) {
    throw new NotFoundException('게시글이 존재하지 않습니다.');
  }
  if (commentId) {
    const isExistNextComment = await commentDao.getCommentByParentId(commentId);

    if (Object.values(isExistNextComment[0])[0] === 0n) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }

    return await commentDao.getNextCommentList(boardId, commentId);
  }

  return await commentDao.getCommentList(boardId);
};

export const updateComment = async (userId, boardId, commentId, content) => {
  const isExistPost = await commentDao.getPostById(boardId);
  const isExistComment = await commentDao.getCommentById(commentId);
  const isMatchUser = await commentDao.getUserByComment(userId, commentId);

  if (!isExistPost) {
    throw new NotFoundException('게시글이 존재하지 않습니다.');
  }

  if (!isExistComment) {
    throw new NotFoundException('댓글이 존재하지 않습니다.');
  }

  if (Object.values(isMatchUser) === 0n) {
    throw new UnauthorizedException('권한이 없습니다.');
  }

  return await commentDao.updateComment(userId, commentId, content);
};
