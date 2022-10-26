import boardRepository from '../models/board.js';

function checkCreatePermissions(userRole, boardType) {
  const { NOTICE, FREE, OPERATION } = boardRepository.BoardType;
  if (boardType === FREE) {
    if (userRole != 'admin' && userRole != 'user') {
      return false;
    }
  } else if (boardType === NOTICE || boardType === OPERATION) {
    if (userRole != 'admin') {
      return false;
    }
  } else {
    return false;
  }
  return true;
}

async function createPost(title, content, boardType, userId, userRole) {
  // 접근 권한 확인 middleware로 변환
  if (!checkCreatePermissions(userRole, boardType)) {
    //throw new UnauthorizedException('잘못된 접근 권한 입니다.');
  }
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
