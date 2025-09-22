import { config } from 'src/config/envConfig';
import { InfoEntity } from 'src/core/entities/info.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB.HOST,
  port: Number(config.DB.PORT),
  username: config.DB.USER,
  password: config.DB.PASS,
  database: config.DB.NAME,
  synchronize: true,
  logging: false,
  entities: [InfoEntity]
});
