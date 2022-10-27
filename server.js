import 'express-async-errors';
import dotenv from 'dotenv';
import createApp from './app.js';

dotenv.config();

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`server start PORT:${PORT}`);
  });
};
startServer();
