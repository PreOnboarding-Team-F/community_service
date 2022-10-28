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

  it('commentRepository.createNextComment TEST', async () => {
    const userId = 1;
    const boardId = 1;
    const content = '대댓글 등록';
    const parentId = 1;

    commentRepository.getPostById = jest.fn(() => [{ boardId: 1 }]);
    await commentService.createComment(userId, boardId, content, parentId);

    expect(commentService.createComment);
  });

  it('게시글이 없는 경우', () => {
    const result = {
      userId: 1,
      boardId: 1,
      commentId: 2,
      content: '댓글 수정 테스트',
    };
    commentRepository.getPostById = jest.fn();

    expect(async () => {
      await commentService.createComment(result);
    }).rejects.toThrowError(NotFoundException);
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
    commentRepository.getPostById = jest.fn(() => [
      {
        boardId: 1,
      },
    ]);
    await commentService.getCommentList(boardId);
    expect(commentService.getCommentList);
  });

  it('commentRepository.getNextCommentList TEST ', async () => {
    commentRepository.getPostById = jest.fn(() => [
      {
        boardId: 1,
      },
    ]);
    commentRepository.getCommentByParentId = jest.fn(() => [
      {
        commentId: 1,
      },
    ]);
    await commentService.getCommentList(boardId, commentId, parentId);
    expect(commentService.getCommentList);
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
      await commentService.getCommentList(userId, boardId, commentId, userRole);
    }).rejects.toThrowError(NotFoundException);
  });

  it('댓글이 없는 경우', () => {
    commentRepository.getCommentById = jest.fn();

    expect(async () => {
      await commentService.getCommentList(boardId);
    }).rejects.toThrowError(NotFoundException);
  });

  it('commentRepository.deleteComment TEST', async () => {
    const userRole = 'admin';
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
        commentId: 1,
      },
    ]);
    commentRepository.getCommentByParentId = jest.fn(() => [
      {
        commentId: 1,
      },
    ]);

    await commentService.deleteComment(userId, boardId, commentId, userRole);
    expect(commentService.deleteComment);
  });

  it('commentRepository.deleteComment TEST', async () => {
    const userRole = 'admin';
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
        commentId: 1,
      },
    ]);
    commentRepository.getCommentByParentId = jest.fn(() => [
      {
        commentId: 1,
      },
    ]);

    await commentService.deleteComment(userId, boardId, commentId, userRole);
    expect(commentService.deleteComment);
  });
});
