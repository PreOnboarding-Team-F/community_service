import boardRepository from '../models/board.js';

async function createPost(title, content, boardType, userId) {
  await boardRepository.createPost(title, content, boardType, userId);
}

async function getFreePost(id) {
  const post = await boardRepository.getPost(id);

  if (post.board_type !== boardRepository.BoardType.FREE) {
    //throw new NotFoundException();
  }
  return post;
}

async function getNoticePost(id) {
  const post = await boardRepository.getPost(id);

  if (post.board_type !== boardRepository.BoardType.NOTICE) {
    //throw new NotFoundException();
  }
  return post;
}

async function getOperationPost(id) {
  const post = await boardRepository.getPost(id);

  if (post.board_type !== boardRepository.BoardType.OPERATION) {
    //throw new NotFoundException();
  }
  return post;
}

export default {
  createPost,
  getFreePost,
  getNoticePost,
  getOperationPost,
};
