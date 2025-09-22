import { InfoEntity } from 'src/core/entities/info.entity';
import { DataSource } from 'typeorm';
import {config} from '../../config/envConfig'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB.HOST,
  port: config.DB.PORT,
  username: config.DB.USER,
  password: config.DB.PASS,
  database: config.DB.NAME,
  synchronize: true,
  logging: false,
  entities: [InfoEntity],
});