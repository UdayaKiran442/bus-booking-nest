import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { DataSource } from 'typeorm';

import { AuthGaurd } from 'src/auth-gaurd/auth.gaurd';
import { BookedSeatsDTO, BookingsDTO } from 'src/dto/bookings.dto';

import { BookingService } from 'src/services/bookings.service';

@Controller()
export class BookingsController {
  constructor(
    private readonly bookingService: BookingService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(AuthGaurd)
  @Post('/booking/new-booking')
  async booking(
    @Body() bookingsDTO: BookingsDTO,
    @Request() req: any,
    @Res() res: Response,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const newBooking = await this.bookingService.bookBus(
        req.user.id,
        bookingsDTO,
      );
      await queryRunner.commitTransaction();
      return res.status(HttpStatus.CREATED).json({
        success: true,
        newBooking,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error,
      });
    }
  }
  @Get('/booking/booked-seats')
  async getSeats(
    @Body() getBookedSeatsDto: BookedSeatsDTO,
    @Res() res: Response,
  ) {
    const bookedSeats = await this.bookingService.getBookedSeatsOfTheBus(
      getBookedSeatsDto,
    );
    return res.json({
      success: true,
      bookedSeats,
    });
  }
}
