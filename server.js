import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import http from 'http';
import routes from './routes/index.js';
import { globalErrorHandler } from './middleware/globalErrorHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();

const corsOption = {
  origin: '*',
};

const app = express();
const server = http.createServer(app);

app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
// Error Middleware
app.use(globalErrorHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server start PORT:${PORT}`);
});
