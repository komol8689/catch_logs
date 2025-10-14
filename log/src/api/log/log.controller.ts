import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { type } from 'src/config/enum';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) { }

  @MessagePattern('createLog')
  create(@Payload() dto: CreateLogDto) {
    return this.logService.create(dto);
  }

  @MessagePattern('findAllLog')
  findAll(type: type) {
    return this.logService.findAll(type);
  }

  @MessagePattern('findOneLog')
  findOne(@Payload() id: number, type: type) {
    return this.logService.findOne(id, type);
  }

  @MessagePattern('updateLog')
  update(@Payload() dto: UpdateLogDto) {
    return this.logService.update(dto.id, dto);
  }

  @MessagePattern('removeLog')
  remove(@Payload() id: number, type: type) {
    return this.logService.remove(id,type);
  }
}
