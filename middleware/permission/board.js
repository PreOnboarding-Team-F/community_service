import { BoardType } from '../../models/board.js';
import { ForbiddenException } from '../../util/exception/index.js';

export const checkCreatePermissions = (req, res, next) => {
  const boardType = req.body.boardType;
  const userRole = req.role;

  if (boardType === BoardType.FREE) {
    if (userRole != 'ADMIN' && userRole != 'USER') {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }
  } else if (
    boardType === BoardType.NOTICE ||
    boardType === BoardType.OPERATION
  ) {
    if (userRole != 'ADMIN') {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }
  } else {
    throw new ForbiddenException('접근 권한이 없습니다.');
  }
  next();
};

export const checkGetOperationPermission = (req, res, next) => {
  const userRole = req.role;
  if (userRole !== 'USER') {
    throw new ForbiddenException('접근 권한이 없습니다.');
  }
  next();
};
