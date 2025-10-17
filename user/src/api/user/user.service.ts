import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ISuccess, successRes } from 'src/common/success/successRes';
import { CryptoService } from 'src/common/crypto/Crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly crypto: CryptoService
  ) { }

  // ----------------------- CREATE -----------------------

  async create(dto: CreateUserDto): Promise<ISuccess> {
    const { email, password, ...rest } = dto
    const existEmail = await this.user.findOne({ where: { email } })
    if (existEmail) {
      throw new ConflictException(`this email ${email} already exist`)
    }
    const hash_password = await this.crypto.encrypt(password)
    const data = await this.user.save(this.user.create({ password: hash_password, email, ...rest }))
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
