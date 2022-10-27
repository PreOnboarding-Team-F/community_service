import * as commentDao from '../models/comment.js';
import { NotFoundException } from '../util/exception/notFound.exception.js';

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
