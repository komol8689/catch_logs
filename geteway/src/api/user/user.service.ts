import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { config } from 'src/config/envConfig';
import { firstValueFrom } from 'rxjs';
import { type } from 'src/config/enum';

@Injectable()
export class UserService {
  private userService: ClientProxy
  private logsService: ClientProxy
  constructor() {

    // userService
    this.userService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: Number(config.USER_PORT),
        host: String(config.API_URL)
      }
    })

    // logsService
    this.logsService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: Number(config.LOGS_PORT),
        host: String(config.API_URL)
      }
    })
  }

  // -------------------- CREATE --------------------

  async create(dto: CreateUserDto) {
    try {
      const result = await firstValueFrom(
        this.userService.send('createUser', dto)
      );
      await firstValueFrom(
        this.logsService.send('createLog', { type: type.INFO, info: JSON.stringify(result) })
      )
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      this.logsService.send('createLog', { type: type.ERROR, error })
      return {
        success: false,
        message: error.error || 'User yaratishda xatolik',
      };
    }
  }
  // -------------------- FIND ALL --------------------

  findAll() {
    return this.userService.send('findAllUser', {})
  }
  // -------------------- FIND ONE --------------------

  async findOne(id: number) {
    try {
      const result = await firstValueFrom(
        this.userService.send('findOneUser', id)
      );
      this.logsService.send('findOneLog', { type: type.INFO, result })
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      this.logsService.send('findOneLog', { type: type.ERROR, error })
      return {
        success: false,
        message: error.error || 'User yoq',
      };
    }
  }
  // -------------------- UPDATE --------------------

  async update(id: number, dto: UpdateUserDto) {
    try {
      const result = await firstValueFrom(
        this.userService.send('updateUser', { id, dto })
      );
      this.logsService.send('updateLog', { type: type.INFO, result })
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      this.logsService.send('updateLog', { type: type.ERROR, error })
      return {
        success: false,
        message: error.error || 'User update qilnmadi',
      };
    }
  }
  // -------------------- DELETE --------------------

  async remove(id: number) {
    try {
      const result = await firstValueFrom(
        this.userService.send('removeUser', id)
      );
      this.logsService.send('removeLog', { type: type.INFO, result })
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      this.logsService.send('removeLog', { type: type.ERROR, error })
      return {
        success: false,
        message: error.error || 'User remove qilinmadi',
      };
    }
  }
}

