import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/envConfig';
import { LogModule } from './api/log/log.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    host: config.DATABASE.HOST,
    port: config.DATABASE.PORT,
    database: config.DATABASE.NAME,
    entities: [],
    synchronize: true
  }), LogModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
