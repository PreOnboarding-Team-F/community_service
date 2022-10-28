import express from 'express';
import * as statisticsController from '../controllers/statistics.js';
import { checkGetOperationPermission } from '../middleware/permission/board.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router();

router.get(
  '/gender',
  isLogin,
  checkGetOperationPermission,
  statisticsController.getGender
);
router.get(
  '/age',
  isLogin,
  checkGetOperationPermission,
  statisticsController.getAge
);
router.get(
  '/accesstime',
  isLogin,
  checkGetOperationPermission,
  statisticsController.getAccesstime
);
router.get(
  '/visit',
  isLogin,
  checkGetOperationPermission,
  statisticsController.getVisit
);

export default router;
