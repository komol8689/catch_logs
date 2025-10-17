import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoLog } from './entities/info.entity';
import { MongoRepository } from 'typeorm';
import { ErrorLog } from './entities/error.entity';
import { type } from 'src/config/enum';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(InfoLog) private readonly info: MongoRepository<InfoLog>,
    @InjectRepository(ErrorLog) private readonly error: MongoRepository<ErrorLog>,) { }

  // -------------------- CREATE --------------------

  async create(dto: CreateLogDto) {
    console.log(dto);

    if (dto.type == type.INFO) {
      return await this.info.save(this.info.create(dto))
    } else if (dto.type == type.ERROR) {
      return await this.error.save(this.error.create(dto))
    } else {
      throw new ConflictException(`not found this type => ${dto.type}`)
    }
  }

  // -------------------- FIND ALL --------------------

  async findAll(dto: type) {
    if (dto == type.ERROR) {
      return await this.error.find()
    } else if (dto == type.INFO) {
      return await this.info.find()
    }
  }

  // -------------------- FIND ONE --------------------

  async findOne(id: number, dto: type) {
    if (dto == type.ERROR) {
      const error = await this.error.findOne({ where: { id } })
      if (!error) {
        throw new NotFoundException('not found error')
      }
      return error
    } else if (dto == type.INFO) {
      const info = await this.info.findOne({ where: { id } })
      if (!info) {
        throw new NotFoundException('not found info')
      }
      return info
    }
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  // -------------------- REMOVE --------------------

  async remove(id: number, dto: type) {
    await this.findOne(id, dto)
    if (dto == type.INFO) {
      await this.info.delete(id)

    } else if (dto == type.ERROR) {
      await this.error.delete(id)
    }
    return {}
  }
}
