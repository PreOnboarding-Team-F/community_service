import boardService from '../services/board.js';

async function createPost(req, res) {
  const userId = req.userId;
  const { boardType, title, content } = req.body;

  await boardService.createPost(title, content, boardType, userId);

  res.status(201).send({ message: 'CREATE SUCCESS' });
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

async function updatePost(req, res) {
  const id = req.params.id;
  const userId = req.userId;
  const updateData = req.body;

  await boardService.updatePost(id, updateData, userId);

  res.status(200).send({ message: 'UPDATE SUCCESS' });
}

async function deletePost(req, res) {
  const id = req.params.id;
  const userId = req.userId;

  await boardService.deletePost(id, userId);

  res.status(200).send({ message: 'DELETE SUCCESS' });
}

async function getFreePosts(req, res) {
  const posts = await boardService.getFreePosts();

  res.status(200).send({ data: posts });
}

async function getNoticePosts(req, res) {
  const posts = await boardService.getNoticePosts();

  res.status(200).send({ data: posts });
}

export default {
  createPost,
  getFreePost,
  getNoticePost,
  getOperationPost,
  updatePost,
  deletePost,
  getFreePosts,
  getNoticePosts,
};
