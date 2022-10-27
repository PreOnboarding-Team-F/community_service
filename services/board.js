import { BoardType } from '../models/board.js';
import { NotFoundException } from '../util/exception/index.js';
import boardRepository from '../models/board.js';

async function createPost(title, content, boardType, userId) {
  await boardRepository.createPost(title, content, boardType, userId);
}

async function getFreePost(id) {
  const post = await boardRepository.getPost(id);

  if (post.board_type !== BoardType.FREE) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  return post;
}

async function getNoticePost(id) {
  const post = await boardRepository.getPost(id);

  if (post.board_type !== BoardType.NOTICE) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  return post;
}

async function getOperationPost(id) {
  const post = await boardRepository.getPost(id);

  if (post.board_type !== BoardType.OPERATION) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  return post;
}

export default {
  createPost,
  getFreePost,
  getNoticePost,
  getOperationPost,
};
