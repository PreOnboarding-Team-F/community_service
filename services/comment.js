import * as commentRepository from '../models/comment.js';
import { NotFoundException } from '../util/exception/index.js';
import { UnauthorizedException } from '../util/exception/index.js';

export const createComment = async (userId, boardId, content, parentId) => {
  const isExistPost = await commentRepository.getPostById(boardId);

  if (!isExistPost) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (parentId) {
    return await commentRepository.createNestComment(
      userId,
      boardId,
      content,
      parentId
    );
  }

  return await commentRepository.createComment(userId, boardId, content);
};

export const getCommentList = async (boardId, commentId) => {
  const isExistPost = await commentRepository.getPostById(boardId);
  if (!isExistPost) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  if (commentId) {
    const isExistNextComment = await commentRepository.getCommentByParentId(
      commentId
    );

    if (Object.values(isExistNextComment[0])[0] === 0n) {
      throw new NotFoundException('잘못된 요청입니다.');
    }

    return await commentRepository.getNextCommentList(boardId, commentId);
  }

  return await commentRepository.getCommentList(boardId);
};

export const updateComment = async (userId, boardId, commentId, content) => {
  const isExistPost = await commentRepository.getPostById(boardId);
  const isExistComment = await commentRepository.getCommentById(commentId);
  const isMatchUser = await commentRepository.getUserByComment(
    userId,
    commentId
  );

  if (!isExistPost) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (!isExistComment) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (Object.values(isMatchUser[0])[0] === 0n) {
    throw new UnauthorizedException('권한이 없습니다.');
  }

  return await commentRepository.updateComment(userId, commentId, content);
};

export const deleteComment = async (userId, boardId, commentId, userRole) => {
  const isExistPost = await commentRepository.getPostById(boardId);
  const isExistComment = await commentRepository.getCommentById(commentId);
  const isMatchUser = await commentRepository.getUserByComment(
    userId,
    commentId
  );
  const isExistParentComment = await commentRepository.getCommentByParentId(
    commentId
  );

  const isMatchUserValue = Object.values(isMatchUser[0])[0];
  const isExistParentCommentValue = Object.values(isExistParentComment[0])[0];

  if (!isExistPost) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (!isExistComment) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (
    (userRole === 'admin' || isMatchUserValue === 1n) &&
    isExistParentCommentValue === 1n
  ) {
    return await commentRepository.leaveComment(commentId, boardId);
  }

  if (userRole === 'admin' || Object.values(isMatchUser[0])[0] === 1n) {
    return await commentRepository.deleteComment(commentId, boardId);
  }

  throw new UnauthorizedException('접근 권한이 없습니다.');
};
