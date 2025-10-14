import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoLog } from './entities/info.entity';
import { ErrorLog } from './entities/error.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InfoLog, ErrorLog])],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule { }
