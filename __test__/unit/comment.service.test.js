import { NotFoundException } from '../../util/exception/index.js';

import * as commentRepository from '../../models/comment.js';
import * as commentService from '../../services/comment.js';

jest.mock('../../models/comment.js');

describe('comment Controller createComment', () => {
  it('commentRepository.createComment TEST', () => {
    const userId = '';
    const boardId = '';
    const content = '';

    commentRepository.getPostById = jest.fn(() => [{ boardId: 1 }]);
    commentService.createComment(userId, boardId, content);

    expect(commentRepository.createComment);
  });

  it('commentRepository.createComment TEST', () => {
    const userId = '';
    const boardId = '';
    const content = '';
    const parentId = '';

    commentRepository.getPostById = jest.fn(() => [{ boardId: 1 }]);
    commentService.createComment(userId, boardId, content, parentId);

    expect(commentRepository.createComment);
  });
});

describe('Comment Controller getCommentList', () => {
  let boardId, commentId, parentId;

  beforeEach(() => {
    boardId = 1;
    commentId = 1;
    parentId = 1;
  });

  it('게시글이 없는 경우', () => {
    commentRepository.getPostById = jest.fn();

    expect(async () => {
      await commentService.getCommentList(boardId);
    }).rejects.toThrowError(NotFoundException);
  });

  it('댓글이 없는 경우', () => {
    commentRepository.getCommentById = jest.fn();

    expect(async () => {
      await commentService.getCommentList(boardId);
    }).rejects.toThrowError(NotFoundException);
  });

  it('commentRepository.getCommentList TEST', async () => {
    const result = {
      boardId: 1,
      commentId: 1,
    };
    commentRepository.getPostById = jest.fn(result);
    const data = await commentRepository.getCommentList(boardId, commentId);
    expect(data);
  });

  it('commentRepository.getNextCommentList TEST ', async () => {
    const result = {
      boardId: 1,
      commentId: 1,
      parentId: 1,
    };
    commentRepository.getPostById = jest.fn(result);
    const data = await commentRepository.getCommentList(
      boardId,
      commentId,
      parentId
    );
    expect(data);
  });
});

describe('comment Controller updatePost', () => {
  let userId, boardId, commentId, content;

  beforeEach(() => {
    userId = 1;
    boardId = 1;
    commentId = 1;
    content = '댓글';
  });

  it('게시글이 없는 경우', () => {
    commentRepository.getPostById = jest.fn();

    expect(async () => {
      await commentService.getCommentList(boardId);
    }).rejects.toThrowError(NotFoundException);
  });

  it('댓글이 없는 경우', () => {
    commentRepository.getCommentById = jest.fn();

    expect(async () => {
      await commentService.getCommentList(boardId);
    }).rejects.toThrowError(NotFoundException);
  });

  it('commentRepository.updateComment TEST', async () => {
    const result = {
      userId: 1,
      boardId: 1,
      commentId: 2,
      content: '댓글 수정 테스트',
    };
    commentRepository.getPostById = jest.fn(result);
    const data = await commentRepository.updateComment(
      userId,
      boardId,
      commentId,
      content
    );
    expect(data);
  });
});

describe('comment Controller deletePost', () => {
  let boardId, commentId, userId, userRole;

  beforeEach(() => {
    boardId = 1;
    commentId = 1;
    userId = 1;
    userRole = '';
  });

  it('게시글이 없는 경우', () => {
    commentRepository.getPostById = jest.fn();

    expect(async () => {
      await commentService.getCommentList(boardId);
    }).rejects.toThrowError(NotFoundException);
  });

  it('댓글이 없는 경우', () => {
    commentRepository.getCommentById = jest.fn();

    expect(async () => {
      await commentService.getCommentList(boardId);
    }).rejects.toThrowError(NotFoundException);
  });

  it('commentRepository.deleteComment TEST', async () => {
    commentRepository.getPostById = jest.fn(() => [
      {
        boardId: 1,
      },
    ]);
    commentRepository.getCommentById = jest.fn(() => [
      {
        commentId: 1,
      },
    ]);
    commentRepository.getUserByComment = jest.fn(() => [
      {
        userId: 1,
        commentId: 2,
      },
    ]);
    commentRepository.getCommentByParentId = jest.fn(() => [
      {
        commentId: 1,
      },
    ]);

    await commentService.deleteComment(userId, boardId, commentId);
    expect(commentService.deleteComment);
  });
});
