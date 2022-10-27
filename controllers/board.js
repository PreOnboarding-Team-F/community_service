import boardService from '../services/board.js';

async function createPost(req, res) {
  const userId = req.userId;
  const { title, content } = req.body;

  await boardService.createPost(title, content, userId);

  res.status(201).send({ message: 'CREATE SUCCESS' });
}

async function updatePost(req, res) {
  const id = req.params.id;
  const userId = req.userId;
  const updateData = req.body;

  await boardService.updatePost(id, updateData, userId);

  res.status(200).send({ message: 'UPDATE SUCCESS' });
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
  updatePost,
};
