import boardService from '../services/board.js';

async function createPost(req, res) {
  const { boardType, title, content } = req.body;
  //const { userId, userRole } = req.token;
  const userId = 1;
  const userRole = 'admin';
  if (!boardType || !title || !content) {
    //throw new BadRequestException('유효하지 않은 데이터 입니다.');
  }
  await boardService.createPost(title, content, boardType, userId, userRole);

  res.status(201).send({ message: 'success' });
}
async function getFreePost(req, res) {
  const id = parseInt(req.param('id')); //머지 후 validate 에서 integer로 변환
  const post = await boardService.getFreePost(id);
  res.status(200).send({ data: post });
}

async function getNoticePost(req, res) {
  const id = parseInt(req.param('id'));
  const post = await boardService.getNoticePost(id);
  res.status(200).send({ data: post });
}

async function getOperationPost(req, res) {
  const id = parseInt(req.param('id'));
  const post = await boardService.getOperationPost(id);
  res.status(200).send({ data: post });
}

export default {
  createPost,
  getFreePost,
  getNoticePost,
  getOperationPost,
};
