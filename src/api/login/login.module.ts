import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisEntity } from 'src/core/entities/regis.entity';
import { CryptoService } from 'src/common/crypto/Crypto';
import { ErrorEntity } from 'src/core/entities/error.entity';
import { InfoEntity } from 'src/core/entities/info.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RegisEntity,ErrorEntity,InfoEntity])],
  controllers: [LoginController],
  providers: [LoginService,CryptoService],
})
export class LoginModule {}
