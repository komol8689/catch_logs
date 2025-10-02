import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisEntity } from '../../core/entities/regis.entity';
import { CryptoService } from '../../common/crypto/Crypto';
import { ErrorEntity } from '../../core/entities/error.entity';
import { InfoEntity } from '../../core/entities/info.entity';
import { successRes } from '../../common/success/successRes';


@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(RegisEntity)
    private readonly user: Repository<RegisEntity>,
    private readonly crypto: CryptoService,
    @InjectRepository(ErrorEntity)
    private readonly error: Repository<ErrorEntity>,
    @InjectRepository(InfoEntity)
    private readonly info: Repository<InfoEntity>,
  ) { }
  // --------------- LOG IN ---------------

  async login(createLoginDto: CreateLoginDto) {
    const { email, password } = createLoginDto

    // check email
    const exist = await this.user.findOne({ where: { email } })
    if (!exist) {
      throw new NotFoundException('Email or Password is invalid')
    }

    // check pass
    const checkPassword = await this.crypto.decrypt(password, exist.hash_password)
    if (!checkPassword) {
      throw new NotFoundException('Email or Password is invalid')
    }

    // return success
    return successRes(exist)
  }

  // --------------- GET ERROR ---------------
  async getError() {
    return await this.error.find({ where: { isDeleted: false }, take: 100, order: { createdAt: 'DESC' } })
  }


  // --------------- GET INFO ---------------
  async getInfo() {
    return await this.info.find({ where: { isDeleted: false }, take: 100, order: { createdAt: 'DESC' } })
  }
}
