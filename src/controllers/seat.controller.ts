import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthGaurd } from 'src/auth-gaurd/auth.gaurd';

import { SeatDTO } from 'src/dto/seat.dto';

import { Seat } from 'src/entities/seat.entity';

import { SeatService } from 'src/services/seat.service';

@Controller()
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @UseGuards(AuthGaurd)
  @Post('/seat/new-seat/:busId')
  async addSeat(
    @Param() param: any,
    @Body() seatDto: SeatDTO,
    @Res() res: Response,
    @Request() req: any,
  ): Promise<Response<Seat>> {
    const { user } = req;
    if (!user.isAdmin) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: 'Unauthorized access' });
    }
    const seat = await this.seatService.addSeat(param.busId, seatDto);
    if (!seat) return res.json({ error: 'Invalid bus id' });
    return res.json({ message: 'Seat added succesfully', seat });
  }
}
