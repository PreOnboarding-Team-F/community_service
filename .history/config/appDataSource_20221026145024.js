import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [],
  logging: true,
  synchronize: true,
});
