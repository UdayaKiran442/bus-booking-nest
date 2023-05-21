import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Bus } from '../entities/bus.entity';
import { Service } from '../entities/service.entity';
import { JwtModule } from '@nestjs/jwt';

import { BusService } from 'src/services/bus.service';

import { BusController } from 'src/controllers/bus.controller';

import { BusServiceNumberModule } from './busService.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bus, Service]),
    BusServiceNumberModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({}),
  ],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
