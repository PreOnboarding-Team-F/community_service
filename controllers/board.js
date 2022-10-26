import boardService from '../services/board.js';

async function createPost(req, res) {
  const boardType = req.query.type;
  const { title, content } = req.body;
  //const { userId, userRole } = req.token;

  if (!boardType || !title || !content) {
    res.status(400).send({ message: '잘못 된 요청입니다.' });
  }

  await boardService.createPost(title, content, boardType, userId, userRole);
  res.status(201).send({ message: '성공' });
}
export default {
  createPost,
};
