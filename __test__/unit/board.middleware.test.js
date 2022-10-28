import {
  checkCreatePermissions,
  checkGetOperationPermission,
} from '../../middleware/permission/board.js';

import { ForbiddenException } from '../../util/exception/index.js';
import httpMocks from 'node-mocks-http';

describe('Board checkCreatePermissions Middleware', () => {
  it('board type이 free이고, user role이 admin or user가 아닌 경우 ForbiddenException', () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/board/post',
      body: {
        boardType: 'free',
      },
      role: '',
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    expect(() => {
      checkCreatePermissions(request, response, next);
    }).toThrowError(ForbiddenException);
  });

  it('board type이 notice이고, user role이 admin이 아닌 경우 ForbiddenException', () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/board/post',
      body: {
        boardType: 'notice',
      },
      role: '',
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    expect(() => {
      checkCreatePermissions(request, response, next);
    }).toThrowError(ForbiddenException);
  });

  it('board type이 operation이고, user role이 admin이 아닌 경우 ForbiddenException', () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/board/post',
      body: {
        boardType: 'operation',
      },
      role: '',
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    expect(() => {
      checkCreatePermissions(request, response, next);
    }).toThrowError(ForbiddenException);
  });

  it('board type이 free, notice, operation이 아닌 경우 ForbiddenException', () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/board/post',
      body: {
        boardType: '',
      },
      role: '',
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    expect(() => {
      checkCreatePermissions(request, response, next);
    }).toThrowError(ForbiddenException);
  });

  it('board Type과 User Role 권한이 올바른 경우 next 호출', () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/board/post',
      body: {
        boardType: 'free',
      },
      role: 'ADMIN',
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    checkCreatePermissions(request, response, next);

    expect(next).toBeCalledTimes(1);
  });
});

describe('Board checkGetOperationPermission Middleware', () => {
  it('user role이 admin이 아닌 경우 ForbiddenException', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/board/operation',
      role: '',
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    expect(() => {
      checkGetOperationPermission(request, response, next);
    }).toThrowError(ForbiddenException);
  });

  it('user role이 admin인 경우 next 호출', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/board/operation',
      role: 'ADMIN',
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    checkGetOperationPermission(request, response, next);
    expect(next).toBeCalledTimes(1);
  });
});
