import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { Service } from '../entities/service.entity';

import { BusServiceNumberService } from 'src/services/busService.service';

import { BusServiceNumberController } from 'src/controllers/busService.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    ConfigModule.forRoot({}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [BusServiceNumberController],
  providers: [BusServiceNumberService],
})
export class BusServiceNumberModule {}
