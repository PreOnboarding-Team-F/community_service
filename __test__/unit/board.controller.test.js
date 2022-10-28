import boardController from '../../controllers/board.js';
import boardService from '../../services/board.js';
import httpMocks from 'node-mocks-http';

jest.mock('../../services/board.js');

describe('Board Controller createPost', () => {
  it('boardService.craetePost 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/board/post',
      userId: 1,
    });
    const response = httpMocks.createResponse();
    boardService.createPost = jest.fn();

    await boardController.createPost(request, response);

    expect(boardService.createPost).toBeCalledTimes(1);
    expect(response.statusCode).toBe(201);
    expect(response._getJSONData().message).toBe('CREATE SUCCESS');
  });
});

describe('Board Controller getFreePost', () => {
  it('boardService.getFreePost 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/board/free',
      params: {
        id: 1,
      },
    });
    const response = httpMocks.createResponse();
    const data = { id: 1 };
    boardService.getFreePost = jest.fn(() => {
      return data;
    });

    await boardController.getFreePost(request, response);

    expect(boardService.getFreePost).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().data).toEqual(data);
  });
});

describe('Board Controller getNoticePost', () => {
  it('boardService.getNoticePost 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/board/notice',
      params: {
        id: 1,
      },
    });
    const response = httpMocks.createResponse();
    const data = { id: 1 };
    boardService.getNoticePost = jest.fn(() => {
      return data;
    });

    await boardController.getNoticePost(request, response);

    expect(boardService.getNoticePost).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().data).toEqual(data);
  });
});

describe('Board Controller getOperationPost', () => {
  it('boardService.getOperationPost 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/board/operation',
      params: {
        id: 1,
      },
    });
    const response = httpMocks.createResponse();
    const data = { id: 1 };
    boardService.getOperationPost = jest.fn(() => {
      return data;
    });

    await boardController.getOperationPost(request, response);

    expect(boardService.getOperationPost).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().data).toEqual(data);
  });
});

describe('Board Controller updatePost', () => {
  it('boardService.updatePost 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'PATCH',
      url: '/board/post',
      params: {
        id: 1,
      },
    });
    const response = httpMocks.createResponse();
    boardService.updatePost = jest.fn();

    await boardController.updatePost(request, response);

    expect(boardService.updatePost).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().message).toEqual('UPDATE SUCCESS');
  });
});

describe('Board Controller deletePost', () => {
  it('boardService.deletePost 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'DELETE',
      url: '/board/post',
      params: {
        id: 1,
      },
    });
    const response = httpMocks.createResponse();
    boardService.deletePost = jest.fn();

    await boardController.deletePost(request, response);

    expect(boardService.deletePost).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().message).toEqual('DELETE SUCCESS');
  });
});

describe('Board Controller getFreePosts', () => {
  it('boardService.getFreePosts 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/board/free',
    });
    const response = httpMocks.createResponse();
    const data = [{ id: 1 }, { id: 2 }];
    boardService.getFreePosts = jest.fn(() => {
      return data;
    });

    await boardController.getFreePosts(request, response);

    expect(boardService.getFreePosts).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().data).toEqual(data);
  });
});

describe('Board Controller getNoticePosts', () => {
  it('boardService.getNoticePosts 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/board/notice',
    });
    const response = httpMocks.createResponse();
    const data = [{ id: 1 }, { id: 2 }];
    boardService.getNoticePosts = jest.fn(() => {
      return data;
    });

    await boardController.getNoticePosts(request, response);

    expect(boardService.getNoticePosts).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().data).toEqual(data);
  });
});

describe('Board Controller getOperationPosts', () => {
  it('boardService.getOperationPosts 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/board/operation',
    });
    const response = httpMocks.createResponse();
    const data = [{ id: 1 }, { id: 2 }];
    boardService.getOperationPosts = jest.fn(() => {
      return data;
    });

    await boardController.getOperationPosts(request, response);

    expect(boardService.getOperationPosts).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().data).toEqual(data);
  });
});
