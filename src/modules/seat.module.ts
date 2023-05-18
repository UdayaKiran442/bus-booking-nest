import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Seat } from '../entities/seat.entity';
import { Bus } from '../entities/bus.entity';

import { SeatService } from 'src/services/seat.service';
import { SeatController } from 'src/controllers/seat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Bus])],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
