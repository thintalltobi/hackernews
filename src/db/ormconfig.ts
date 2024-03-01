import { join } from 'path';
import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: '',
  password: '',
  database: '',
  synchronize: false,
  bigNumberStrings: true,
  multipleStatements: true,
  logging: true,
  entities: ["dist/**/*.entity.js"],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;