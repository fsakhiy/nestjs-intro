import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { SimpleCatModel } from 'src/dtos/cat.dto';
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<SimpleCatModel[]> {
    return this.catsService.getAll();
  }

  @Get('/:uuid')
  async findOne(@Param('uuid') catId: string): Promise<SimpleCatModel> {
    return this.catsService.findOne(catId);
  }

  @Post()
  async createOne(@Req() request: Request): Promise<string> {
    const status = await this.catsService.createOne(request);
    if (!status) {
      throw new BadRequestException('failed to create');
    }
    return 'created';
  }

  @Delete('/:uuid')
  async deleteOne(@Param('uuid') catId: string): Promise<string> {
    return this.catsService.deleteOne(catId);
  }
}
