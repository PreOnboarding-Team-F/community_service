import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import http from 'http';
import routes from './routes/index.js';
dotenv.config();

const corsOption = {
  origin: '*',
};

const app = express();
const server = http.createServer(app);

app.use(cors(corsOption));
app.use(morgan('dev'));
