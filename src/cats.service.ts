import { Injectable, BadRequestException } from '@nestjs/common';

import { Request } from 'express';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { SimpleCatModel } from 'src/dtos/cat.dto';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<SimpleCatModel[]> {
    return this.prisma.cats.findMany({
      select: {
        uuid: true,
        name: true,
        breed: true,
        birthDate: true,
      },
    });
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

  async findOne(catId: string): Promise<SimpleCatModel> {
    return await this.prisma.cats.findFirst({
      where: {
        uuid: catId,
      },
      select: {
        uuid: true,
        name: true,
        breed: true,
        birthDate: true,
      },
    });
  }

  async deleteOne(data: Prisma.CatsWhereUniqueInput): Promise<boolean> {
    try {
      await this.prisma.cats.delete({
        where: data,
      });
    } catch (e) {
      return false;
    }
    return true;
  }
}
