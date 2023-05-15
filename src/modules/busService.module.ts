import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Service } from '../entities/service.entity';

import { BusServiceNumberService } from 'src/services/busService.service';

import { BusServiceNumberController } from 'src/controllers/busService.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [BusServiceNumberController],
  providers: [BusServiceNumberService],
})
export class BusServiceNumberModule {}
