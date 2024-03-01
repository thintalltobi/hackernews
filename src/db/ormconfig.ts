import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: 'root',
  password: '',
  database: 'hacker-news',
  synchronize: false,
  bigNumberStrings: true,
  multipleStatements: true,
  entities: ['dist/**/*.entity.js'],
  //entities: [__dirname + '/../**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
