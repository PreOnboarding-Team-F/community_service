import { DataSource } from 'typeorm';

const myDataSource = new DataSource({
  type: '',
  host: '',
  port: 3306,
  username: '',
  password: '',
  database: '',
  entities: [],
  logging: true,
  synchronize: true,
});
