import boardService from '../services/board.js';

async function createPost(req, res) {
  const boardType = req.query.type;
  const { title, content } = req.body;
  const { userId, userRole } = req.token;

  if (!boardType || !title || !content) {
    //throw new BadRequestException('유효하지 않은 데이터 입니다.');
  }
  await boardService.createPost(title, content, boardType, userId, userRole);

  res.status(201).send({ message: 'success' });
}
export default {
  createPost,
};
