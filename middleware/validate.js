import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }
  res.status(400).send({ message: error.array()[0].msg });
};
