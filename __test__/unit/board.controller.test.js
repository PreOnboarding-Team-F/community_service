import boardController from '../../controllers/board.js';
import boardService from '../../services/board.js';
import httpMocks from 'node-mocks-http';

jest.mock('../../services/board.js');

describe('Board Controller createPost', () => {
  it('boardService.craetePost 실행 확인', () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/board/post',
      userId: 1,
    });
    const response = httpMocks.createResponse();
    boardService.createPost = jest.fn();

    boardController.createPost(request, response);

    expect(boardService.createPost).toBeCalledTimes(1);
    expect(response.statusCode).toBe(201);
    expect(response._getJSONData.message).toBe('CREATE SUCCESS');
  });
});
