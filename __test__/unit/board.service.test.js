import {
  ForbiddenException,
  NotFoundException,
} from '../../util/exception/index.js';

import boardRepository from '../../models/board.js';
import boardService from '../../services/board.js';

jest.mock('../../models/board.js');

describe('Board Controller createPost', () => {
  it('boardRepository.createPost 실행 확인', () => {
    const title = '';
    const content = '';
    const boardType = '';
    const userId = '';
    boardRepository.createPost = jest.fn();
    boardService.createPost(title, content, boardType, userId);

    expect(boardRepository.createPost).toBeCalledTimes(1);
  });
});

describe('Board Controller getFreePost', () => {
  let id;

  beforeEach(() => {
    id = 1;
  });

  it('post이 없는 경우', () => {
    boardRepository.findById = jest.fn();

    expect(async () => {
      await boardService.getFreePost(id);
    }).rejects.toThrowError(NotFoundException);
  });

  it('board type이 free가 아닌 경우', () => {
    boardRepository.findById = jest.fn(id => {
      return {
        boardType: '',
      };
    });

    expect(async () => {
      await boardService.getFreePost(id);
    }).rejects.toThrowError(NotFoundException);
  });

  it('return post', async () => {
    const result = { boardType: 'free' };
    boardRepository.findById = jest.fn(id => result);
    const post = await boardService.getFreePost(id);
    expect(post).toEqual(result);
  });
});

describe('Board Controller getNoticePost', () => {
  let id;

  beforeEach(() => {
    id = 1;
  });

  it('post이 없는 경우', () => {
    boardRepository.findById = jest.fn();

    expect(async () => {
      await boardService.getNoticePost(id);
    }).rejects.toThrowError(NotFoundException);
  });

  it('board type이 notice가 아닌 경우', () => {
    boardRepository.findById = jest.fn(id => {
      return {
        boardType: '',
      };
    });

    expect(async () => {
      await boardService.getNoticePost(id);
    }).rejects.toThrowError(NotFoundException);
  });

  it('return post', async () => {
    const result = { boardType: 'notice' };
    boardRepository.findById = jest.fn(id => result);
    const post = await boardService.getNoticePost(id);
    expect(post).toEqual(result);
  });
});

describe('Board Controller getOperationPost', () => {
  let id;

  beforeEach(() => {
    id = 1;
  });

  it('post이 없는 경우', () => {
    boardRepository.findById = jest.fn();

    expect(async () => {
      await boardService.getOperationPost(id);
    }).rejects.toThrowError(NotFoundException);
  });

  it('board type이 operation이 아닌 경우', () => {
    boardRepository.findById = jest.fn(id => {
      return {
        boardType: '',
      };
    });

    expect(async () => {
      await boardService.getOperationPost(id);
    }).rejects.toThrowError(NotFoundException);
  });

  it('return post', async () => {
    const result = { boardType: 'operation' };
    boardRepository.findById = jest.fn(id => result);
    const post = await boardService.getOperationPost(id);
    expect(post).toEqual(result);
  });
});

describe('Board Controller updatePost', () => {
  let id, updateData, userId;

  beforeEach(() => {
    id = 1;
    updateData = {};
    userId = 1;
  });

  it('post이 없는 경우', () => {
    boardRepository.findById = jest.fn();

    expect(async () => {
      await boardService.updatePost(id, updateData, userId);
    }).rejects.toThrowError(NotFoundException);
  });

  it('post user id가 user id와 다른경우', () => {
    boardRepository.findById = jest.fn(id => {
      return {
        user: { id: 2 },
      };
    });

    expect(async () => {
      await boardService.updatePost(id, updateData, userId);
    }).rejects.toThrowError(ForbiddenException);
  });

  it('boardRepository.updatePost 실행 확인', async () => {
    boardRepository.findById = jest.fn(id => {
      return {
        user: { id: 1 },
      };
    });
    boardRepository.updatePost = jest.fn();

    await boardService.updatePost(id, updateData, userId);
    expect(boardRepository.updatePost).toBeCalledTimes(1);
  });
});

describe('Board Controller deletePost', () => {
  let id, userId;

  beforeEach(() => {
    id = 1;
    userId = 1;
  });

  it('post이 없는 경우', () => {
    boardRepository.findById = jest.fn();

    expect(async () => {
      await boardService.deletePost(id, userId);
    }).rejects.toThrowError(NotFoundException);
  });

  it('post user id가 user id와 다른경우', () => {
    boardRepository.findById = jest.fn(id => {
      return {
        user: { id: 2 },
      };
    });

    expect(async () => {
      await boardService.deletePost(id, userId);
    }).rejects.toThrowError(ForbiddenException);
  });

  it('boardRepository.deletePost 실행 확인', async () => {
    boardRepository.findById = jest.fn(id => {
      return {
        user: { id: 1 },
      };
    });
    boardRepository.deletePost = jest.fn();

    await boardService.deletePost(id, userId);
    expect(boardRepository.deletePost).toBeCalledTimes(1);
  });
});
