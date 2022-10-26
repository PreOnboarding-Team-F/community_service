import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: process.env.TYPE,
  host: process.env.HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [],
  logging: false,
  synchronize: false,
});
