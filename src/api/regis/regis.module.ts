import { Module } from '@nestjs/common';
import { RegisService } from './regis.service';
import { RegisController } from './regis.controller';

@Module({
  controllers: [RegisController],
  providers: [RegisService],
})
export class RegisModule {}
