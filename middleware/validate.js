import { BadRequestException } from '../util/exception/index.js';
import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw new BadRequestException(errors.array()[0].msg);
};
