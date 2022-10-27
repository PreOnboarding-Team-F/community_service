import * as commentService from '../services/comment.js';

export const createComment = async (req, res) => {
  const { boardId } = req.query;
  const { userId, content } = req.body;

  if (!userId || !boardId || !content) {
    //throw new BadRequestException ("KEY ERROR")
  }

  await commentService.createComment(userId, Number(boardId), content);
  res.status(201).json({ message: 'Create Comment' });
};

export const getCommentList = async (req, res) => {
  const { boardId } = req.query;

  if (!boardId) {
    //throw new BadRequestException("KEY ERROR")
  }

  const result = await commentService.getCommentList(Number(boardId));
  res.status(200).json(result);
};

export const updateComment = async (req, res) => {
  const { boardId } = req.query;
  const { userId, commentId, content } = req.body;
  // const {  } = req.body;

  if (!boardId || !commentId || !userId) {
    //throw new BadRequestException("KEY ERROR")
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
  const { userId, commentId } = req.body;

  if (!userId || !boardId || commentId) {
    //throw new BadRequestException("KEY ERROR")
  }
  await commentService.deleteComment(userId, Number(boardId), commentId);
  res.status(200).json({ message: 'Delete Comment' });
};
