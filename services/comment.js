import * as commentDao from '../models/comment.js';

export const createComment = async (userId, boardId, content) => {
  return await commentDao.createComment(userId, boardId, content);
};
