import { Injectable } from '@nestjs/common';
import { CreateRegiDto } from './dto/create-regi.dto';
import { UpdateRegiDto } from './dto/update-regi.dto';

@Injectable()
export class RegisService {
  create(createRegiDto: CreateRegiDto) {
    return 'This action adds a new regi';
  }

  findAll() {
    return `This action returns all regis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} regi`;
  }

  update(id: number, updateRegiDto: UpdateRegiDto) {
    return `This action updates a #${id} regi`;
  }

  remove(id: number) {
    return `This action removes a #${id} regi`;
  }
}
