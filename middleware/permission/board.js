import { BoardType } from '../../models/board.js';
import { ForbiddenException } from '../../util/exception/index.js';

export const checkCreatePermissions = (req, res, next) => {
  const boardType = req.body.boardType;
  const userRole = req.token.userRole;

  if (boardType === BoardType.FREE) {
    if (userRole != 'admin' && userRole != 'user') {
      throw new ForbiddenException('잘못된 접근 권한 입니다.');
    }
  } else if (
    boardType === BoardType.NOTICE ||
    boardType === BoardType.OPERATION
  ) {
    if (userRole != 'admin') {
      throw new ForbiddenException('잘못된 접근 권한 입니다.');
    }
  } else {
    throw new ForbiddenException('잘못된 접근 권한 입니다.');
  }
  next();
};

export const checkGetOperationPermission = (req, res, next) => {
  const userRole = req.token.userRole;
  if (userRole !== 'admin') {
    throw new ForbiddenException('잘못된 접근 권한 입니다.');
  }
  next();
};