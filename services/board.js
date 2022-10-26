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
    //throw new BadRequestException();
  }
  await boardRepository.createPost(title, content, boardType, userId);
}

export default {
  createPost,
};
