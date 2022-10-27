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
