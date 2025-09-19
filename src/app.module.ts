import { Module } from '@nestjs/common';
import { Application } from './app.service';
import { RegisModule } from './api/regis/regis.module';
import { LoginModule } from './api/login/login.module';

@Module({
  imports: [RegisModule, LoginModule],
})
export class AppModule {}
