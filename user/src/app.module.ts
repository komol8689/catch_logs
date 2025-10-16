import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/envConfig';
import { UserModule } from './api/user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    url: config.DB_URL,
    synchronize: true,
    autoLoadEntities: true,
    entities: []
  }), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
