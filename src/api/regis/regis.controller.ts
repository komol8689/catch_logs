import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegisService } from './regis.service';
import { CreateRegiDto } from './dto/create-regi.dto';
import { UpdateRegiDto } from './dto/update-regi.dto';

@Controller('regis')
export class RegisController {
  constructor(private readonly regisService: RegisService) {}

  @Post()
  create(@Body() createRegiDto: CreateRegiDto) {
    return this.regisService.create(createRegiDto);
  }

  @Get()
  findAll() {
    return this.regisService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regisService.remove(+id);
  }
}
