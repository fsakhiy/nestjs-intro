import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.development',
        '.env.local',
        '.env.production',
        '.env',
      ],
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, PrismaService],
})
export class AppModule {}
