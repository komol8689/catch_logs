import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { config } from 'src/config/envConfig';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private userService: ClientProxy
  constructor() {
    this.userService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: Number(config.USER_PORT),
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
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
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
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
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
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
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
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.error || 'User remove qilinmadi',
      };
    }
  }
}

