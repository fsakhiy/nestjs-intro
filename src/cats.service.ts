import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

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
    // return
    let data: SimpleCatModel;
    try {
      data = await this.prisma.cats.findFirst({
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
      if (!data) throw new NotFoundException('data not found');
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(e.message);
      }
      throw new NotFoundException('data not found');
    }
    return data;
  }

  async deleteOne(uuid: string): Promise<string> {
    try {
      const cat = await this.prisma.cats.findFirst({
        where: {
          uuid: uuid,
        },
      });

      if (!cat) {
        throw new NotFoundException('data not found');
      }

      await this.prisma.cats.delete({
        where: {
          id: cat.id,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(e.message);
      }
      throw new InternalServerErrorException('cannot delete ' + e);
      // return false;
    }

    return 'data deleted';

    // return await this.prisma.cats.delete(data);
  }
}
