import {
  ForbiddenException,
  NotFoundException,
} from '../util/exception/index.js';

import { BoardType } from '../models/board.js';
import boardRepository from '../models/board.js';

const createPost = async (title, content, boardType, userId) => {
  await boardRepository.createPost(title, content, boardType, userId);
};

const getFreePost = async id => {
  const post = await boardRepository.findById(id);

  if (!post) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (post.boardType !== BoardType.FREE) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  return post;
};

const getNoticePost = async id => {
  const post = await boardRepository.findById(id);

  if (!post) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (post.boardType !== BoardType.NOTICE) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  return post;
};

const getOperationPost = async id => {
  const post = await boardRepository.findById(id);

  if (!post) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (post.boardType !== BoardType.OPERATION) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  return post;
};

const updatePost = async (id, updateData, userId) => {
  const post = await boardRepository.findById(id);

  if (!post) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (post.user.id !== userId) {
    throw new ForbiddenException('접근 권한이 없습니다.');
  }

  await boardRepository.updatePost(id, updateData, userId);
};

const deletePost = async (id, userId) => {
  const post = await boardRepository.findById(id);

  if (!post) {
    throw new NotFoundException('잘못된 요청입니다.');
  }

  if (post.user.id !== userId) {
    throw new ForbiddenException('접근 권한이 없습니다.');
  }

  await boardRepository.deletePost(id);
};

const getFreePosts = async () => {
  return await boardRepository.getFreePosts();
};

const getNoticePosts = async () => {
  return await boardRepository.getNoticePosts();
};

const getOperationPosts = async () => {
  return await boardRepository.getOperationPosts();
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
