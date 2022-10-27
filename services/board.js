import {
  ForbiddenException,
  NotFoundException,
} from '../util/exception/index.js';

import { BoardType } from '../models/board.js';
import boardRepository from '../models/board.js';

async function createPost(title, content, boardType, userId) {
  await boardRepository.createPost(title, content, boardType, userId);
}

async function getFreePost(id) {
  const post = await boardRepository.findById(id);

  if (!post) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (post.board_type !== BoardType.FREE) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  return post;
}

async function getNoticePost(id) {
  const post = await boardRepository.findById(id);

  if (!post) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (post.board_type !== BoardType.NOTICE) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  return post;
}

async function getOperationPost(id) {
  const post = await boardRepository.findById(id);

  if (!post) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (post.board_type !== BoardType.OPERATION) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  return post;
}

async function updatePost(id, updateData, userId) {
  const post = await boardRepository.findById(id);

  if (!post) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (post.user.id !== userId) {
    throw new ForbiddenException('접근 권한이 없습니다.');
  }

  await boardRepository.updatePost(id, updateData, userId);
}

async function deletePost(id, userId) {
  const post = await boardRepository.findById(id);

  if (!post) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (post.user.id !== userId) {
    throw new ForbiddenException('접근 권한이 없습니다.');
  }

  await boardRepository.deletePost(id);
}

async function getFreePosts() {
  return await boardRepository.getFreePosts();
}

export default {
  createPost,
  getFreePost,
  getNoticePost,
  getOperationPost,
  updatePost,
  deletePost,
  getFreePosts,
};
