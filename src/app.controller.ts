import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getPostHello(): string {
    return this.appService.getHello();
  }

  @Put()
  updateData(): string {
    return this.appService.getHello();
  }

  @Get('/hello')
  getSayHello(): string {
    return this.appService.getHello();
  }

  @Get('/json')
  getJson(): any {
    return { name: 'you' };
  }
}
