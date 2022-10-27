import * as commentDao from '../models/comment.js';

export const createComment = async (userId, boardId, content) => {
  return await commentDao.createComment(userId, boardId, content);
};

export const getCommentList = async boardId => {
  return await commentDao.getCommentList(boardId);
};

export const updateComment = async (userId, boardId, commentId, content) => {
  // const isMatchId = commentDao.getUserById(commentId);
  // console.log('isMatchId: ', isMatchId);
  // return isMatchId;
  return await commentDao.updateComment(commentId, content);
};

export const deleteComment = async (userId, boardId, commentId) => {
  return await commentDao.deleteComment(userId, boardId, commentId);
};
