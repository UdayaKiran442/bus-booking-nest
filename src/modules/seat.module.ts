import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { Seat } from '../entities/seat.entity';
import { Bus } from '../entities/bus.entity';

import { SeatService } from 'src/services/seat.service';
import { SeatController } from 'src/controllers/seat.controller';
import { Service } from 'src/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seat, Bus, Service]),
    ConfigModule.forRoot({}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
