import boardService from '../services/board.js';

async function createPost(req, res) {
  const { boardType, title, content } = req.body;
  const userId = req.token.userId;

  await boardService.createPost(title, content, boardType, userId);

  res.status(201).send({ message: 'success' });
}
async function getFreePost(req, res) {
  const id = req.params.id;
  const post = await boardService.getFreePost(id);
  res.status(200).send({ data: post });
}

async function getNoticePost(req, res) {
  const id = req.params.id;
  const post = await boardService.getNoticePost(id);
  res.status(200).send({ data: post });
}

async function getOperationPost(req, res) {
  const id = req.params.id;
  const post = await boardService.getOperationPost(id);
  res.status(200).send({ data: post });
}

export default {
  createPost,
  getFreePost,
  getNoticePost,
  getOperationPost,
};
