import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ISuccess, successRes } from 'src/common/success/successRes';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) { }

  // ----------------------- CREATE -----------------------
  async create(dto: CreateUserDto): Promise<ISuccess> {
    const { email } = dto
    const existEmail = await this.user.findOne({ where: { email } })
    if (existEmail) {
      throw new ConflictException(`this email ${email} already exist`)
    }
    const data = await this.user.save(this.user.create(dto))
    return successRes(data, 201)
  }
  // ----------------------- FIND ALL -----------------------

  async findAll(): Promise<ISuccess> {
    const users = await this.user.find({ order: { id: 'DESC' } })
    return successRes(users)
  }

  // ----------------------- FIND ONE -----------------------

  async findOne(id: number): Promise<ISuccess> {
    const data = await this.user.findOne({ where: { id } })
    if (!data) {
      throw new NotFoundException(`not found this user ${id}`)
    }
    return successRes(data)
  }
  // ----------------------- UPDATE -----------------------

  async update(id: number, dto: UpdateUserDto): Promise<ISuccess> {
    await this.findOne(id)
    await this.user.update(id, dto)
    return this.findOne(id)
  }
  // ----------------------- DELETE -----------------------

  async remove(id: number): Promise<ISuccess> {
    await this.findOne(id)
    await this.user.delete(id)
    return successRes({})
  }
}
