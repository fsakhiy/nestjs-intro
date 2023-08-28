import { Injectable, BadRequestException } from '@nestjs/common';

import { Request } from 'express';
import { PrismaService } from './prisma.service';
import { Prisma, Cats as CatModel } from '@prisma/client';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<CatModel[]> {
    return this.prisma.cats.findMany();
  }

  async createOne(req: Request): Promise<boolean> {
    const data = req.body;
    if (data.name === undefined) {
      throw new BadRequestException('name is required');
    }
    try {
      await this.prisma.cats.create({
        data: {
          name: data.name,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return false;
      }
      return false;
    }
    return true;
  }

  async findOne(data: Prisma.CatsWhereUniqueInput): Promise<CatModel> {
    return this.prisma.cats.findFirst({
      where: data,
    });
  }
}
