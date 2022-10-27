import 'express-async-errors';

import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import express from 'express';
import { globalErrorHandler } from './middleware/globalErrorHandler.js';
import morgan from 'morgan';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import routes from './routes/index.js';
dotenv.config();

const createApp = () => {
  const app = express();
  const corsOption = {
    origin: '*',
  };

  app.use(cors(corsOption));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(routes);
  // Error Middleware
  app.use(notFoundHandler);
  app.use(globalErrorHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
