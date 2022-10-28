import boardService from '../services/board.js';

const createPost = async (req, res) => {
  const userId = req.userId;
  const { boardType, title, content } = req.body;

  await boardService.createPost(title, content, boardType, userId);

  res.status(201).send({ message: 'CREATE SUCCESS' });
};

const getFreePost = async (req, res) => {
  const id = req.params.id;

  const post = await boardService.getFreePost(id);

  res.status(200).send({ data: post });
};

const getNoticePost = async (req, res) => {
  const id = req.params.id;

  const post = await boardService.getNoticePost(id);

  res.status(200).send({ data: post });
};

const getOperationPost = async (req, res) => {
  const id = req.params.id;

  const post = await boardService.getOperationPost(id);

  res.status(200).send({ data: post });
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  const updateData = req.body;

  await boardService.updatePost(id, updateData, userId);

  res.status(200).send({ message: 'UPDATE SUCCESS' });
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  await boardService.deletePost(id, userId);

  res.status(200).send({ message: 'DELETE SUCCESS' });
};

const getFreePosts = async (req, res) => {
  const posts = await boardService.getFreePosts();

  res.status(200).send({ data: posts });
};

const getNoticePosts = async (req, res) => {
  const posts = await boardService.getNoticePosts();

  res.status(200).send({ data: posts });
};

const getOperationPosts = async (req, res) => {
  const posts = await boardService.getOperationPosts();

  res.status(200).send({ data: posts });
};

export default {
  createPost,
  getFreePost,
  getNoticePost,
  getOperationPost,
  updatePost,
  deletePost,
  getFreePosts,
  getNoticePosts,
  getOperationPosts,
};
