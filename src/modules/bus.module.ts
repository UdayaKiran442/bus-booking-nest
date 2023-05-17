import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bus } from '../entities/bus.entity';
import { Service } from '../entities/service.entity';

import { BusService } from 'src/services/bus.service';

import { BusController } from 'src/controllers/bus.controller';

import { BusServiceNumberModule } from './busService.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bus, Service]), BusServiceNumberModule],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
