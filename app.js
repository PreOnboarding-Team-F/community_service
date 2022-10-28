import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import { globalErrorHandler } from './middleware/globalErrorHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
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
  app.use(globalErrorHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
