import 'express-async-errors';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import routes from './routes/index.js';

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

// 임시 Error Middleware
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: '서버 에러' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server start PORT:${PORT}`);
});
