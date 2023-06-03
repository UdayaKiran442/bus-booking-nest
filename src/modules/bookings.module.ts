import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { Bus } from 'src/entities/bus.entity';
import { Bookings } from 'src/entities/bookings.entity';
import { User } from 'src/entities/user.entity';

import { BookingService } from 'src/services/bookings.service';

import { BookingsController } from 'src/controllers/bookings.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bus, Bookings, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({}),
  ],
  controllers: [BookingsController],
  providers: [BookingService],
})
export class BookingsModule {}
