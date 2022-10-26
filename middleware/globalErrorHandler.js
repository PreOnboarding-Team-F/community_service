export const globalErrorHandler = (error, req, res, next) => {
  const status = error.status;
  const message = error.message;

  if (status) {
    return res.status(status).send({ message });
  }
  next(error);
};
