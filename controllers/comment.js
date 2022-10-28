import * as commentService from '../services/comment.js';
import { BadRequestException } from '../util/exception/index.js';

export const createComment = async (req, res) => {
  const { boardId } = req.query;
  const { userId, content, parentId } = req.body;
  // const userId = req.userId;

  if (!userId || !boardId || !content) {
    throw new BadRequestException('잘못된 요청입니다.');
  }

  await commentService.createComment(
    userId,
    Number(boardId),
    content,
    parentId
  );
  res.status(201).json({ message: 'Create Comment' });
};

export const getCommentList = async (req, res) => {
  const { boardId } = req.query;
  const { commentId } = req.body;

  if (!boardId) {
    throw new BadRequestException('KEY ERROR');
  }

  const result = await commentService.getCommentList(
    Number(boardId),
    commentId
  );
  res.status(200).json(result);
};
