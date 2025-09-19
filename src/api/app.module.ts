import { Module } from '@nestjs/common';
import { RegisModule } from './regis/regis.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/envConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: config.DB.USER,
      host: config.DB.HOST,
      password: config.DB.PASS,
      port: config.DB.PORT,
      database: config.DB.NAME,

      autoLoadEntities:true,
      synchronize:true,
      entities:[]
    }),
    RegisModule, LoginModule],
})
export class AppModule { }