import { BadRequestException } from '../../util/exception/index.js';

import * as commentController from '../../controllers/comment.js';
import * as commentService from '../../services/comment.js';
import httpMocks from 'node-mocks-http';

jest.mock('../../services/comment.js');

describe('comment Controller createComment', () => {
  it('commentService.createComment TEST', async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/comment/post',
      query: {
        boardId: 1,
      },
      userId: 1,
      body: {
        content: '댓글 등록',
      },
    });
    const response = httpMocks.createResponse();
    commentService.createComment = jest.fn();

    await commentController.createComment(request, response);

    expect(201);
    expect({ message: 'CREATE COMMENT' });
  });
});

describe('comment Controller createNextComment', () => {
  it('commentService.createNextComment TEST', async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/comment/post',
      query: {
        boardId: 1,
      },
      userId: 1,
      body: {
        content: '댓글 등록',
        parentId: 1,
      },
    });
    const response = httpMocks.createResponse();
    commentService.createComment = jest.fn();

    await commentController.createComment(request, response);

    expect(201);
    expect({ message: 'CREATE COMMENT' });
  });

  it('특정 키값이 없는 경우', async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/comment/post',
      query: {
        boardId: 1,
      },
      userId: 1,
      body: {
        parentId: 1,
      },
    });
    const response = httpMocks.createResponse();
    commentService.createComment = jest.fn();

    expect(async () => {
      await commentController.createComment(request, response);
    }).rejects.toThrowError(BadRequestException);
  });
});

describe('comment Controller getCommentList', () => {
  it('commentService.getCommentList TEST', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/comment/post',
      query: {
        boardId: 1,
      },
      body: {
        commentId: 1,
      },
    });
    const response = httpMocks.createResponse();
    commentService.getCommentList = jest.fn(() => [
      { boardId: 1, commentId: 1 },
    ]);

    const data = await commentController.getCommentList(request, response);

    expect(200);
    expect(data);
  });

  it('특정 키값이 없는 경우', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/comment/post',
    });
    const response = httpMocks.createResponse();
    commentService.getCommentList = jest.fn();

    expect(async () => {
      await commentController.getCommentList(request, response);
    }).rejects.toThrowError(BadRequestException);
  });
});

describe('comment Controller updateComment', () => {
  it('commentService.updatePost 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'PATCH',
      url: '/comment/post',
      query: {
        boardId: 1,
      },
      userId: 1,
      body: {
        commentId: 1,
        content: '댓글 수정 테스트',
      },
    });
    const response = httpMocks.createResponse();
    commentService.updateComment = jest.fn(() => [
      {
        userId: 1,
        boardId: 1,
        commentId: 1,
        content: '댓글 수정 테스트',
      },
    ]);

    await commentController.updateComment(request, response);

    expect(200);
    expect({ message: 'UPDATE SUCCESS' });
  });

  it('특정 키값이 없는 경우', async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/comment/post',
    });
    const response = httpMocks.createResponse();
    commentService.updateComment = jest.fn();

    expect(async () => {
      await commentController.updateComment(request, response);
    }).rejects.toThrowError(BadRequestException);
  });
});

describe('comment Controller deleteComment', () => {
  it('commentService.deleteComment 실행 확인', async () => {
    const request = httpMocks.createRequest({
      method: 'DELETE',
      url: '/comment/Comment',
      query: {
        boardId: 1,
      },
      userId: 1,
      body: {
        commentId: 1,
      },
    });
    const response = httpMocks.createResponse();
    commentService.deleteComment = jest.fn(() => [
      {
        userId: 1,
        boardId: 1,
        commentId: 1,
        content: '댓글 수정 테스트',
      },
    ]);

    await commentController.deleteComment(request, response);

    expect(200);
    expect({ message: 'DELETE SUCCESS' });
  });

  it('특정 키값이 없는 경우', async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/comment/post',
    });
    const response = httpMocks.createResponse();
    commentService.deleteComment = jest.fn();

    expect(async () => {
      await commentController.deleteComment(request, response);
    }).rejects.toThrowError(BadRequestException);
  });
});
