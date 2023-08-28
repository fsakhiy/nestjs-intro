import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { Cats } from '@prisma/client';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cats[]> {
    return this.catsService.getAll();
  }

  @Get('/:uuid')
  async findOne(@Param('uuid') catId: string): Promise<Cats> {
    return this.catsService.findOne({ uuid: catId });
  }

  @Post()
  async createOne(@Req() request: Request): Promise<string> {
    const status = await this.catsService.createOne(request);
    if (!status) {
      throw new BadRequestException('failed to create');
    }
    return 'created';
  }
}
