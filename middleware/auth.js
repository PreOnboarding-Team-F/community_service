import jwt from 'jsonwebtoken';
import * as userRepository from '../models/user.js';
import { BadRequestException } from '../util/badRequest.exception.js';

const AUTH_ERROR_MESSAGE = 'Authentication Error';
export const isLogin = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    throw new BadRequestException(AUTH_ERROR_MESSAGE);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    if (error) {
      throw new BadRequestException(AUTH_ERROR_MESSAGE);
    }

    const user = await userRepository.getUserById(decoded.id);
    if (!user) {
      throw new BadRequestException(AUTH_ERROR_MESSAGE);
    }
    req.userId = user.id;
    req.role = user.role;

    next();
  });
};
