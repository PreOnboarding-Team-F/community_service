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
  if (!checkCreatePermissions(userRole, boardType)) {
    //throw new UnauthorizedException('잘못된 접근 권한 입니다.');
  }
  await boardRepository.createPost(title, content, boardType, userId);
}

async function getFreePost(id) {
  return await boardRepository.getPost(id);
}

export default {
  createPost,
  getFreePost,
};
