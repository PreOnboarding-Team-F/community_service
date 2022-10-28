import * as commentService from '../services/comment.js';
import { BadRequestException } from '../util/exception/index.js';

export const createComment = async (req, res) => {
  const { boardId } = req.query;
  const { content, parentId } = req.body;
  const userId = req.userId;

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
    throw new BadRequestException('잘못된 요청입니다.');
  }

  const result = await commentService.getCommentList(
    Number(boardId),
    commentId
  );
  res.status(200).json(result);
};

export const updateComment = async (req, res) => {
  const { boardId } = req.query;
  const { commentId, content } = req.body;
  const userId = req.userId;

  if (!boardId || !commentId || !userId) {
    throw new BadRequestException('잘못된 요청입니다.');
  }

  await commentService.updateComment(
    userId,
    Number(boardId),
    commentId,
    content
  );
  res.status(200).json({ message: 'Update Comment' });
};

export const deleteComment = async (req, res) => {
  const { boardId } = req.query;
  const { commentId } = req.body;
  const userId = req.userId;
  const userRole = req.role;

  if (!userId || !boardId || !commentId) {
    throw new BadRequestException('잘못된 요청입니다.');
  }
  await commentService.deleteComment(
    userId,
    Number(boardId),
    commentId,
    userRole
  );
  res.status(200).json({ message: 'Delete Comment' });
};
